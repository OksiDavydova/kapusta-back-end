const queryString = require("query-string");
const axios = require("axios");
const { isExistUser, createUser } = require("../../services/auth");
const User = require("../../models/User");

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

  const isUserExist = await isExistUser(userData.data.email);

  if (!isUserExist) {
    await createUser({ email: userData.data.email });
  }

  const currentUser = await User.findOne({ email: userData.data.email });

  // переадресация по линку. Можем подставить любые данные
  // return res.redirect(`${process.env.FRONTEND_URL}?id=${currentUser.id}`);
  return res.redirect(`${process.env.FRONTEND_URL}/main`);
};
