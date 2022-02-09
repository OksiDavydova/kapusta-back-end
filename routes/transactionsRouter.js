const express = require("express");
const {
  addTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsByMonth,
  getTransactionsByOperation,
  getTransactionsByOperationByMonth,
  getTransactionsForSixMonths,
} = require("../controllers/transactions");
const { wrapperError, guard } = require("../middlewares");

const router = express.Router();

router.route("/").post(wrapperError(guard), wrapperError(addTransaction));
router
  .route("/:id")
  .delete(wrapperError(guard), wrapperError(deleteTransaction));
router.route("/").get(wrapperError(guard), wrapperError(getTransactions));

router
  .route("/:typeOperation")
  .get(wrapperError(guard), wrapperError(getTransactionsByMonth));
router
  .route("/:summary/:typeOperation")
  .get(wrapperError(guard), wrapperError(getTransactionsByOperation));
router
  .route("/:month/:typeOperation/:category")
  .get(
    wrapperError(guard),
    wrapperError(getTransactionsByOperationByMonth)
  );
router
  .route("/:summary")
  .get(wrapperError(guard), wrapperError(getTransactionsForSixMonths));

module.exports = router;
