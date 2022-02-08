const express = require("express");
const { signup, login, logout } = require("../controllers/auth");
const wrapperError = require("../middlewares/wrapperError");
const guard = require("../middlewares/guard");
const { googleAuth, googleRedirect } = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(wrapperError(signup));
router.route("/login").post(wrapperError(login));
router.route("/logout").post(guard, wrapperError(logout)); //guard - правильно?
router.route("/googlelogin").get(wrapperError(googleAuth));
router.route("/google-redirect").get(wrapperError(googleRedirect));

module.exports = router;
