const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const { secretKey } = require("../config");

// Bu örnekte basit bir kullanıcı deposu olarak bir obje kullanılmaktadır.
// Gerçek bir uygulamada, kullanıcı bilgileri bir veritabanında saklanmalıdır.
const users = {};

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).send("User already exists");
  }

  const secret = speakeasy.generateSecret({ length: 20 });
  users[username] = {
    password,
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

exports.login = (req, res) => {
  const { username, password, token } = req.body;
  const user = users[username];

  if (!user || user.password !== password) {
    return res.status(403).send("Invalid username or password");
  }

  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: "base32",
    token,
  });

  if (!verified) {
    return res.status(403).send("Invalid token");
  }

  const jwtToken = jwt.sign({ id: user.id, username }, secretKey, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token: jwtToken });
};

exports.listUsers = (req, res) => {
  res.json(users);
};
