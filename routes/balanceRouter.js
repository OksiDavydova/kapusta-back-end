const express = require("express");
const getBalances = require("../controllers/getBalances");

const router = express.Router();

router.route("/balance").get(getBalances);

module.exports = router;
