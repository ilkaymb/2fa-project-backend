// controllers/registerController.js
const speakeasy = require("speakeasy");
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");

const { keys, mail } = require("../../config");

exports.verifyOTP = async (req, res) => {
  const { otp, STEP1_TOKEN } = req.body;
  let username,
    exp = "";

  jwt.verify(STEP1_TOKEN, keys.step1_key, (err, decoded) => {
    if (err) {
      return res
        .status(400)
        .send(
          err.name === "TokenExpiredError"
            ? "Token süresi doldu."
            : "Token doğrulanamadı."
        );
    } else {
      username = decoded.user;
      exp = decoded.exp;
    }

    const user = Users.getUser(username);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > exp) {
      return res.status(400).send("OTP expired");
    }

    const verified = speakeasy.totp.verify({
      secret: user.secret,
      encoding: "base32",
      step: 600,
      token: otp,
      window: 1,
    });

    if (verified) {
      // OTP doğrulama başarılı, STEP2_TOKEN oluştur
      const STEP2_TOKEN = jwt.sign(
        { username: user.username },
        keys.step2_key,
        { expiresIn: "1h" }
      );

      // Doğrulama başarılı ve STEP2_TOKEN ile yanıt gönder
      res.status(200).json({
        message: "OTP verified successfully",
        token: STEP2_TOKEN,
      });
    } else {
      // Doğrulama başarısız
      res.status(400).send("Invalid OTP");
    }
  });
};
