const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const { secretKey } = require("../config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const users = {};

const saltRounds = 10;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (users[username]) {
    return res.status(400).send("User already exists");
  }

  const secret = speakeasy.generateSecret({ length: 20 });

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  users[username] = {
    email,
    password: hashedPassword,
    secret: secret.base32,
    id: Object.keys(users).length + 1,
  };

  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) {
      return res.status(500).send("Error generating QR code");
    }
    res.json({
      message: "User registered successfully",
      username,
      qrCode: data_url,
    });
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (!user) {
    return res.status(403).send("Invalid username or password");
  }

  // Şifreyi doğrula (Bu örnekte doğrudan karşılaştırma yapıyoruz, gerçek bir uygulamada bcrypt.compare kullanılmalı)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).send("Invalid username or password");
  }

  // OTP oluştur
  const token = speakeasy.totp({
    secret: user.secret,
    encoding: "base32",
    step: 600,
  });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "imbroject@gmail.com",
      pass: "suyf givf hlxd idnv",
    },
  });

  // JWT oluştur
  const expiresIn = 10 * 60; // Token süresi 10 dakika

  var jwtToken = jwt.sign(
    { user: username },
    "MEUHW4LRJF4UG23XKRTFC4TUNYSUGPZG",
    { expiresIn: "10m" }
  );

  // E-posta ile OTP gönder
  const mailOptions = {
    from: { name: "2FA Project", address: "imbroject@gmail.com" }, // sender address
    to: [user.email], // list of receivers
    subject: "Your Password", // Subject line
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div style="max-width: 400px; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
            <h2 style="color: #333;">OTP Verification</h2>
            <p style="color: #666;">Please use the following One-Time Password to complete your transaction:</p>
            <div style="font-size: 24px; margin: 20px 0; padding: 10px; background-color: #f9f9f9; border: 1px solid #e0e0e0; display: inline-block;">${token}</div>
            <p style="color: #666;">This OTP is valid for 10 minutes.</p>
        </div>
    </body>
    </html>`, // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).send({ message: "Failed to send email" });
    } else {
      return res
        .status(200)
        .send({ message: "OTP sent to your email", token: jwtToken });
    }
  });
};
exports.verifyOTP = async (req, res) => {
  const { otp, jwtToken } = req.body;
  var username,
    exp = "";
  jwt.verify(
    jwtToken,
    "MEUHW4LRJF4UG23XKRTFC4TUNYSUGPZG",
    function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(400).send("Token süresi doldu.");
        } else {
          res.status(400).send("Token doğrulanamadı.");
        }
      } else {
        console.log(decoded.username); // Kullanıcının username bilgisini göster
        username = decoded.user;
        exp = decoded.exp;
      }
    }
  );

  const user = users[username];

  if (!user) {
    return res.status(404).send("User not found");
  }

  // OTP geçerlilik süresini kontrol et
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime > exp) {
    return res.status(400).send("OTP expired");
  }

  // Kullanıcının OTP'sini doğrula
  const verified = speakeasy.totp.verify({
    secret: user.secret, // Kullanıcının kaydı sırasında oluşturulan gizli anahtar
    encoding: "base32",
    step: 600,
    token: otp, // Kullanıcı tarafından girilen OTP
    window: 1,
  });

  if (verified) {
    // Doğrulama başarılı
    res.status(200).send("OTP verified successfully");
  } else {
    // Doğrulama başarısız
    res.status(400).send("Invalid OTP");
  }
};

exports.listUsers = (req, res) => {
  res.json(users);
};
