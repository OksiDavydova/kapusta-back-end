const User = require("../../models/User");

const updateToken = async (id, token) => {
  return await User.findOneAndUpdate(id, token);
};

module.exports = updateToken;
