const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const CustomError = require("../lib/CustomError");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, TOKEN_SECRET_KEY);
    return !!verify;
  } catch (e) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  // console.log("guard: ", token);

  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Not authorized");
  }
  const payload = jwt.decode(token);
  const user = await User.findById(payload.id);
  if (!user || user.token !== token) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Not authorized");
  }
  req.user = user;
  next();
};

module.exports = guard;
