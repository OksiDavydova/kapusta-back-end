const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../lib/CustomError");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const logout = async (req, res) => {
  if (!req.headers.authorization) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Error");
  }

  const token = req.headers.authorization.slice(7);

  try {
    const { id } = jwt.decode(token, TOKEN_SECRET_KEY);
    await User.findByIdAndUpdate(id, { token: null });
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: "You have successfully logged out",
    });
  } catch (err) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, err.message);
  }
};

module.exports = logout;
