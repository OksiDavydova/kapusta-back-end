const queryString = require("query-string");
const axios = require("axios");
// const URL = require("url");

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BACKEND_URL}/auth/google-redirect`,
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

  // console.log("code: ", code);

  const tokenData = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.FRONTEND_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code: code,
    },
  });

  // console.log("tokenData.data.access_token: ", tokenData.data.access_token);

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  // console.log("userData.data.email: ", userData.data.email);
  // userData.data.email

  return res.redirect(
    `${process.env.FRONTEND_URL}?email=${userData.data.email}`
    // `${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}&sectionId=${sectionID};
    // 27.00`
  );
};
