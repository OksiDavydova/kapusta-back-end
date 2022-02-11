const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../lib/CustomError");
const { findUserByEmail } = require("../../services/users");
const { EmailService, Sender } = require("../../services/email");

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      `User with ${user.email} not found`
    );
  }

  if (user.isVerify) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Verification has already been passed"
    );
  }

  const emailService = new EmailService(process.env.NODE_ENV, new Sender());
  const isSend = emailService.sendVerifyEmail(
    user.email,
    user.verificationToken
  );

  if (!isSend) {
    throw new CustomError(
      StatusCodes.SERVICE_UNAVAILABLE,
      "Service Unavailable"
    );
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Verification email sent" });
};

module.exports = repeatEmailForVerifyUser;
