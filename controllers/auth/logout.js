const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const logout = async (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Error", code: StatusCodes.UNAUTHORIZED });
  }

  const token = req.headers.authorization.slice(7);

  try {
    const { id } = jwt.decode(token, TOKEN_SECRET_KEY);
    await User.findByIdAndUpdate(id, { token: null });
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: "You have successfully logged out",
    });
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ code: StatusCodes.UNAUTHORIZED, message: error.message });
  }
};

module.exports = logout;
