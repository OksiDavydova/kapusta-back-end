const express = require("express");
const {
  addTransaction,
  deleteTransaction,
  getTransactions,
} = require("../controllers/transactions");
const wrapperError = require("../middlewares/wrapperError");
const guard = require("../middlewares/guard");

const router = express.Router();

router.route("/").post(guard, wrapperError(addTransaction));
router.route("/:id").delete(guard, wrapperError(deleteTransaction));
router.route("/").get(guard, wrapperError(getTransactions));

module.exports = router;
