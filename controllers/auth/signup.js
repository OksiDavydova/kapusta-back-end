const { isExistUser, createUser } = require("../../services/auth");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existUser = await isExistUser(email);
    if (!!existUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ code: StatusCodes.CONFLICT, message: "User is exist" });
    }

    const newUser = await createUser(req.body);

    return res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      message: "User successfully created ",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = signup;
