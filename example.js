const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "imbroject@gmail.com",
    pass: "suyf givf hlxd idnv",
  },
});

let mailOptions = {
  from: "imbroject@gmail.com",
  to: "ilkaymb@hotmail.com",
  subject: "Nodemailer - Test",
  text: "Wooohooo it works!!",
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    return console.log("Error occurs" + err);
  }
  return console.log("Email sent!!!");
});
