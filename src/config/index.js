require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  secretKey: process.env.SECRET_KEY,
  transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  }),
};
