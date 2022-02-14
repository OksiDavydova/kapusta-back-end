const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../lib/CustomError");
const { getUserByToken } = require("../../services/users");
const { updateVerifyUser } = require("../../services/users");

const FRONTEND_URL = process.env.FRONTEND_URL;

const verifyUser = async (req, res, next) => {
  const token = req.params.verificationToken;
  const user = await getUserByToken(token);

  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User not found");
  }

  await updateVerifyUser(user.id, true);
  return res.redirect(`${FRONTEND_URL}/mailconfirm?token=${user.token}`);
};

module.exports = verifyUser;
