const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const bcrypt = require("bcrypt");
const Users = require("../../models/Users");

const saltRounds = 10;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (Users.getUser(username)) {
    return res.status(400).send("User already exists");
  }

  const secret = speakeasy.generateSecret({ length: 20 });

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  Users.addUser(username, {
    email,
    password: hashedPassword,
    secret: secret.base32,
    id: Object.keys(Users.users).length + 1,
  });

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
