const express = require("express");
const {
  signup,
  login,
  logout,
  googleAuth,
  googleRedirect,
} = require("../controllers/auth");
const { wrapperError, guard } = require("../middlewares");

const router = express.Router();

router.route("/signup").post(wrapperError(signup));
router.route("/login").post(wrapperError(login));
router.route("/logout").post(guard, wrapperError(logout));
router.route("/googlelogin").get(wrapperError(googleAuth));
router.route("/google-redirect").get(wrapperError(googleRedirect));

module.exports = router;
