const express = require("express");
const {
  addTransaction,
  deleteTransaction,
  getTransactions,
} = require("../controllers/transactions");
const { wrapperError, guard } = require("../middlewares");

const router = express.Router();

router.route("/").post(wrapperError(guard), wrapperError(addTransaction));
router
  .route("/:id")
  .delete(wrapperError(guard), wrapperError(deleteTransaction));
router.route("/").get(wrapperError(guard), wrapperError(getTransactions));

module.exports = router;
