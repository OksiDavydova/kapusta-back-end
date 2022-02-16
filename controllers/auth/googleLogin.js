const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const { isExistUser, createUser } = require("../../services/auth");
const User = require("../../models/User");
const { updateToken } = require("../../services/users");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BACKEND_URL}/api/v1/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);

  const code = urlParams.code;

  const tokenData = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_URL}/api/v1/auth/google-redirect`,
      grant_type: "authorization_code",
      code: code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const userEmail = userData.data.email;

  const existUser = await isExistUser(userEmail);

  if (!existUser) {
    await createUser({
      email: userEmail,
      isVerify: true,
      verificationToken: "null",
    });
  }

  const currentUser = await User.findOne({
    email: userEmail,
  });

  const token = jwt.sign({ id: currentUser.id }, TOKEN_SECRET_KEY, {
    expiresIn: "8h",
  });

  if (currentUser.token != token) {
    await updateToken({ _id: currentUser.id }, { token: token });
  }

  return res.redirect(`${process.env.FRONTEND_URL}/googleAuth?token=${token}`);
};
