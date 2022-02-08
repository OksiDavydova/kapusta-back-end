const User = require("../../models/User");

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  const { email, balance, id } = user;
  return { email, balance, id };
};

module.exports = findUserById;
