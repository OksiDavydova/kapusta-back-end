const { isExistUser, createUser } = require("../../services/auth");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../lib/CustomError");
const { EmailService, Sender } = require("../../services/email");

const signup = async (req, res, next) => {
  const { email } = req.body;
  const existUser = await isExistUser(email);
  if (!!existUser) {
    throw new CustomError(StatusCodes.CONFLICT, "User is exist");
  }

  const newUser = await createUser(req.body);
  const emailService = new EmailService(process.env.NODE_ENV, new Sender());

  const isSend = await emailService.sendVerifyEmail(
    newUser.email,
    newUser.verificationToken
  );

  return res.status(StatusCodes.CREATED).json({
    code: StatusCodes.CREATED,
    message: "User successfully created",
    user: {
      email: newUser.email,
      isSendVerifyEmail: isSend,
    },
  });
};

module.exports = signup;
