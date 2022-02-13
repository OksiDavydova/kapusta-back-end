const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../lib/CustomError");
const { findUserById } = require("../../services/users");

const current = async (req, res, next) => {
  const { id } = req.user;
  const currentUser = await findUserById(id);

  if (!currentUser) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      `Cannot update user with id: ${id}`
    );
  }

  return res.status(StatusCodes.OK).json({
    code: StatusCodes.OK,
    message: "Successfully",
    user: currentUser,
  });
};

module.exports = current;
