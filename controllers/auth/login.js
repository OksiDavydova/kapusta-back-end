const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { isExistUser } = require("../../services/auth");
const CustomError = require("../../lib/CustomError");

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

  const { balance, id } = existUser;
  // const verifyPassword = await bcryptjs.compare(password, existUser.password);

  jwt.verify(existUser.token, TOKEN_SECRET_KEY, async (err, decoded) => {
    if (err) {
      const token = jwt.sign({ id: existUser.id }, TOKEN_SECRET_KEY, {
        expiresIn: "8h",
      });
      existUser.token = token;
      await existUser.save();
      console.log("New token");
      return res.status(StatusCodes.OK).json({
        message: "Success",
        code: StatusCodes.OK,
        user: { email, balance, token, id },
      });
    }
    console.log("Token has already exist");
    return res.status(StatusCodes.OK).json({
      message: "Success",
      code: StatusCodes.OK,
      user: { email, balance, token, id },
    });
  });
};

module.exports = login;
