const express = require("express");
const { wrapperError, guard } = require("../middlewares");
const { balance, current } = require("../controllers/users");

const router = express.Router();

router.route("/balance").patch(wrapperError(guard), wrapperError(balance));
router.route("/current").get(wrapperError(guard), wrapperError(current));

module.exports = router;
