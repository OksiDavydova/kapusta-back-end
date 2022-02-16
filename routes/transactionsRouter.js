const express = require("express");

const {
  addTransaction,
  deleteTransaction,
  getTransactions,
  getCostsTransactions,
  getIncomesTransactions,
  getBalanceTransactions,
  getForMain,
  getForReport,
} = require("../controllers/transactions");

const setPeriodOfSearchByParams = require("../helpers/statistic/setPeriodOfSearchByParams");
const {
  wrapperError,
  guard,
  validateCreateTransaction,
} = require("../middlewares");
const {
  aggregation,
  aggregationCosts,
  aggregationIncomes,
  aggregationAll,
  aggregationBySorted,
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

// GET generated data for main page
router.route("/formain").get(wrapperError(guard), wrapperError(getForMain));

// GET generated data for report page
router
  .route("/forreport/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(getForReport)
  );

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

// GET ALL INCOMES FOR ALL TIME
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

// GET all transactions sorted by date
router
  .route("/statistics/")
  .get(wrapperError(guard), wrapperError(aggregation));

// GET transactions sorted by date BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/statistics/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(aggregation)
  );

// GET all costs sorted by date
router
  .route("/statisticscosts")
  .get(wrapperError(guard), wrapperError(aggregationCosts));

// GET costs sorted by date BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
router
  .route("/statisticscosts/:period")
  .get(
    wrapperError(guard),
    wrapperError(setPeriodOfSearchByParams),
    wrapperError(aggregationCosts)
  );

// GET all costs incomes by date
router
  .route("/statisticsincomes")
  .get(wrapperError(guard), wrapperError(aggregationIncomes));

// GET incomes sorted by date BY PERIOD ("YYYY" - 4 digitals of year
//                    or YYYYMM - 6 digitals of year and month
//                    or "lastsixmonths" for get by last six months
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
