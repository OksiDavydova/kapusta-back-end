// const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { isExistUser } = require("../../services/auth");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existUser = await isExistUser(email);

    if (!existUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }

    const validPassword = await existUser?.isValidPassword(password);
    if (!validPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }
    // const verifyPassword = await bcryptjs.compare(password, existUser.password);

    jwt.verify(existUser.token, TOKEN_SECRET_KEY, async (error, decoded) => {
      if (error) {
        const token = jwt.sign({ id: existUser.id }, TOKEN_SECRET_KEY, {
          expiresIn: "1h",
        });
        existUser.token = token;
        await existUser.save();
        console.log("New token");
        return res.status(StatusCodes.OK).json({
          message: "Success",
          code: StatusCodes.OK,
          user: existUser,
        });
      }
      console.log("Token has already exist");
      return res
        .status(StatusCodes.OK)
        .json({ message: "Success", code: StatusCodes.OK, user: existUser });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = login;
