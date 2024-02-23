require("dotenv").config();

module.exports = {
  keys: {
    step1_key: process.env.STEP1_KEY,
    step2_key: process.env.STEP2_KEY,
  },
  mail: {
    service: "gmail",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
};
[process.env.NODE_ENV || "development"];
