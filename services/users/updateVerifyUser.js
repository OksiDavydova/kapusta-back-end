const User = require("../../models/User");

const updateVerifyUser = async (id, status) => {
  return User.updateOne(
    { _id: id },
    { isVerify: status, verificationToken: null }
  );
};

module.exports = updateVerifyUser;
