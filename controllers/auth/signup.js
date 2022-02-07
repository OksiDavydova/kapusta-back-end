const { isExistUser, createUser } = require("../../services/auth");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../lib/CustomError");

const signup = async (req, res, next) => {
  const { email } = req.body;
  const existUser = await isExistUser(email);
  if (!!existUser) {
    throw new CustomError(StatusCodes.CONFLICT, "User is exist");
  }

  const newUser = await createUser(req.body);

  return res.status(StatusCodes.CREATED).json({
    code: StatusCodes.CREATED,
    message: "User successfully created ",
    user: newUser,
  });
};

module.exports = signup;
