const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../lib/CustomError");

const balance = async (req, res, next) => {
  const { id } = req.user;
  const { balance } = req.body;
  const updateBalance = await User.findByIdAndUpdate(
    id,
    { balance: balance },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateBalance) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      `Cannot update user with id: ${id}`
    );
  }

  return res.status(StatusCodes.OK).json({
    code: StatusCodes.OK,
    message: "Balance update successful",
    balance,
  });
};

module.exports = balance;
