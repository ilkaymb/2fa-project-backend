const User = require("../../models/Users");

exports.listUsers = (req, res) => {
  res.json(User.users);
};
