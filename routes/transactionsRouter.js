const express = require("express");
const {
  addTransaction,
  deleteTransaction,
  getTransactions,
  getCostsTransactions,
  getIncomesTransactions,
  getTransactionsByOperation,
  getTransactionsByOperationByMonth,
  getTransactionsForSixMonths,
} = require("../controllers/transactions");
const setPeriodOfSearchByParams = require("../helpers/statistic/setPetiodOfSearchByParams");
const { wrapperError, guard, validateCreateTransaction } = require("../middlewares");

const router = express.Router();

// ADD TRANSACTION
router.route("/").post(wrapperError(guard), validateCreateTransaction, wrapperError(addTransaction));

// DELETE TRANSACTION
router
  .route("/:id")
  .delete(wrapperError(guard), wrapperError(deleteTransaction));

// GET ALL COSTS
router.route("/costs").get(
  wrapperError(guard),
  // wrapperError(setPeriodOfSearchByParams),
  wrapperError(getCostsTransactions)
);

// GET COSTS BY PERIOD (YYYY or YYYYMM) - 4 or 6 digitals(YYYY - year, MM - month)
router
  .route("/costs/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(getCostsTransactions)
  );

// GET ALL INCOMES
router
  .route("/incomes")
  .get(wrapperError(guard), wrapperError(getIncomesTransactions));

// GET INCOMES BY PERIOD (YYYY or YYYYMM) - 4 or 6 digitals(YYYY - year, MM - month)
router
  .route("/incomes/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(getIncomesTransactions)
  );

// GET ALL TRANSACTIONS
router.route("/").get(wrapperError(guard), wrapperError(getTransactions));

// GET TRANSACTIONS BY PERIOD (YYYY or YYYYMM) - 4 or 6 digitals(YYYY - year, MM - month)
router
  .route("/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(getTransactions)
  );

// router
//   .route("/:typeOperation") // month=0;
//   .get(wrapperError(guard), wrapperError(getTransactionsByMonth));

// TODO
// router
//   .route("/:summary/:typeOperation") //
//   .get(wrapperError(guard), wrapperError(getTransactionsByOperation));
// router
//   .route("/:month/:typeOperation/:category") //month=0&insome=false&category=продукты;
//   .get(wrapperError(guard), wrapperError(getTransactionsByOperationByMonth));
// router
//   .route("/:summary") // : month=6
//   .get(wrapperError(guard), wrapperError(getTransactionsForSixMonths));

module.exports = router;
