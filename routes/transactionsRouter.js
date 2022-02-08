const express = require("express");
const {
  addTransaction,
  deleteTransaction,
  getTransactions,
} = require("../controllers/transactions");
const wrapperError = require("../middlewares/wrapperError");

const router = express.Router();

router.route("/").post(wrapperError(addTransaction));
router.route("/:id").delete(wrapperError(deleteTransaction));
router.route("/").get(wrapperError(getTransactions));

module.exports = router;
