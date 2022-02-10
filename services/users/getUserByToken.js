const User = require("../../models/User");

const getUserByToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

module.exports = getUserByToken;
