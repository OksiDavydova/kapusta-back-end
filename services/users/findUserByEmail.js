const User = require("../../models/User");

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

module.exports = findUserByEmail;
