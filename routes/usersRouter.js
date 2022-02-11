const express = require("express");
const { wrapperError, guard, validateUpdateBalance, validateId } = require("../middlewares");
const { setBalance, getBalance } = require("../controllers/users");

const router = express.Router();

router
  .route("/setbalance")
  .patch(wrapperError(guard), validateId, validateUpdateBalance, wrapperError(setBalance));
router.route("/getbalance").get(wrapperError(guard), wrapperError(getBalance));

module.exports = router;
