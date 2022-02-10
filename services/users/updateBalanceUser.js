const User = require("../../models/User");

const updateBalanceUser = async (id, balance) => {
  return await User.findByIdAndUpdate(
    id,
    { balance: balance },
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = updateBalanceUser;
