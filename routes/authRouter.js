const express = require("express");
const { signup, login, logout } = require("../controllers/auth");
const wrapperError = require("../middlewares/wrapperError");
const { googleAuth, googleRedirect } = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/googlelogin").get(wrapperError(googleAuth));
router.route("/google-redirect").get(wrapperError(googleRedirect));

module.exports = router;
