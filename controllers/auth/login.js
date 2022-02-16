const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { isExistUser } = require("../../services/auth");
const CustomError = require("../../lib/CustomError");
const { updateToken } = require("../../services/users");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await isExistUser(email);

  if (!existUser) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      "Email or password is wrong"
    );
  }

  const validPassword = await existUser?.isValidPassword(password);
  if (!validPassword) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      "Email or password is wrong"
    );
  }

  const { token, isVerify } = existUser;

  jwt.verify(existUser.token, TOKEN_SECRET_KEY, async (err, decoded) => {
    try {
      if (err) {
        const token = jwt.sign({ id: existUser.id }, TOKEN_SECRET_KEY, {
          expiresIn: "8h",
        });

        existUser.token = token;
        await updateToken({ _id: existUser.id }, { token: token });

        console.log("New token");

        return res.status(StatusCodes.OK).json({
          message: "Success",
          code: StatusCodes.OK,
          user: { email, token, isVerify },
        });
      }

      console.log("Token has already exist");

      return res.status(StatusCodes.OK).json({
        message: "Success",
        code: StatusCodes.OK,
        user: { email, token, isVerify },
      });
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        message: err.message,
      });
    }
  });
};

module.exports = login;
