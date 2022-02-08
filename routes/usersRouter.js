const express = require("express");
const { wrapperError, guard } = require("../middlewares");
const { balance } = require("../controllers/users");

const router = express.Router();

router.route("/balance").patch(guard, wrapperError(balance));

module.exports = router;
