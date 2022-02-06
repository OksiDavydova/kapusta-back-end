const { Router } = require("express");
const wrapperError = require("../middlewares/wrapperError");
const { googleAuth, googleRedirect } = require("../controllers/authController");

const router = Router();
router.get("/googlelogin", wrapperError(googleAuth));
router.get("/google-redirect", wrapperError(googleRedirect));

module.exports = router;
