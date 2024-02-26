const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");
const Users = require("../../models/Users");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const { keys, mail } = require("../../config");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = Users.getUser(username);

  if (!user) {
    return res.status(403).send("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).send("Invalid username or password");
  }

  const token = speakeasy.totp({
    secret: user.secret,
    encoding: "base32",
    step: 600,
    window: 1,
  });
  let transporter = nodemailer.createTransport({
    service: mail.service,
    auth: {
      user: mail.user,
      pass: mail.pass,
    },
  });

  var jwtToken = jwt.sign(
    { user: username, type: "STEP1-TOKEN" },
    keys.step1_key,
    {
      expiresIn: "10m",
    }
  );

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
