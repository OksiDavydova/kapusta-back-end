const express = require("express");

const {
  addTransaction,
  deleteTransaction,
  getTransactions,
  getCostsTransactions,
  getIncomesTransactions,
  getBalanceTransactions,
  getForMain,
} = require("../controllers/transactions");

const setPeriodOfSearchByParams = require("../helpers/statistic/setPeriodOfSearchByParams");
const {
  wrapperError,
  guard,
  validateCreateTransaction,
} = require("../middlewares");
const {
  aggregation,
  aggregationAll,
  aggregationBySorted,
  aggregationCosts,
  aggregationIncomes,
} = require("../controllers/users/");

const router = express.Router();

// ADD TRANSACTION
router
  .route("/")
  .post(
    wrapperError(guard),
    validateCreateTransaction,
    wrapperError(addTransaction)
  );

// DELETE TRANSACTION
router
  .route("/:id")
  .delete(wrapperError(guard), wrapperError(deleteTransaction));

// GET ALL COSTS FOR ALL TIME
router
  .route("/costs")
  .get(wrapperError(guard), wrapperError(getCostsTransactions));

// GET BALANCE
router
  .route("/getbalance")
  .get(wrapperError(guard), wrapperError(getBalanceTransactions));

router.route("/formain").get(wrapperError(guard), wrapperError(getForMain));

// GET COSTS BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/costs/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(getCostsTransactions)
  );

// GET ALL COSTS FOR ALL TIME
router
  .route("/incomes")
  .get(wrapperError(guard), wrapperError(getIncomesTransactions));

// GET INCOMES BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/incomes/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(getIncomesTransactions)
  );

// GET ALL TRANSACTIONS
router.route("/").get(wrapperError(guard), wrapperError(getTransactions));

// GET all sorted by date
router
  .route("/statistics/")
  .get(wrapperError(guard), wrapperError(aggregation));

// GET all sorted by date BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/statistics/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(aggregation)
  );
router
  .route("/statisticscosts/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(aggregationCosts)
  );
router
  .route("/statisticsincomes/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(aggregationIncomes)
  );

// GET sorted by value of description
router
  .route("/sorted")
  .get(wrapperError(guard), wrapperError(aggregationBySorted));

// GET sorted by value of description Y PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/sorted/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(aggregationBySorted)
  );

// GET one value of icomes and costs
router
  .route("/incomesandcosts")
  .get(wrapperError(guard), wrapperError(aggregationAll));

// GET one value of icomes and costs BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/incomesandcosts/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(aggregationAll)
  );

// GET TRANSACTIONS BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(getTransactions)
  );

module.exports = router;
