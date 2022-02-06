const User = require("../../models/User");

const isExistUser = async (email) => {
  const isExistUser = await User.findOne({ email });
  return isExistUser;
};

module.exports = isExistUser;
