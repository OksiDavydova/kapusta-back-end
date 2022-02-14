const addTransaction = require("./addTransaction");
const deleteTransaction = require("./deleteTransaction");
const getCostsTransactions = require("./getCostsTransactions");
const getIncomesTransactions = require("./getIncomesTransactions");
const getTransactions = require("./getTransactions");
const getTransactionsByMonth = require("./getTransactionsByMonth");
const getTransactionsByOperation = require("./getTransactionsByOperation");
const getTransactionsByOperationByMonth = require("./getTransactionsByOperationByMonth");
const getTransactionsForSixMonths = require("./getTransactionsForSixMonths");
const getStatistics = require("./getStatistics");
const getStatisticsForCategory = require("./getStatisticsForCategory");
const getSortedByValueOfDescription = require("./getSortedByValueOfDescription");
const getIncomesAndCosts = require("./getIncomesAndCosts");
const getBalanceTransactions = require("./getBalanceTransactions");
const getIncomesForMain = require("./getIncomesForMain");
const getCostsForMain = require("./getCostsForMain");
const getStatisticsCosts = require("./getStatisticsCosts");
const getStatisticsIncomes = require("./getStatisticsIncomes");

module.exports = {
  addTransaction,
  deleteTransaction,
  getTransactions,
  getCostsTransactions,
  getIncomesTransactions,
  getTransactionsByMonth,
  getTransactionsByOperation,
  getTransactionsByOperationByMonth,
  getTransactionsForSixMonths,
  getStatistics,
  getStatisticsForCategory,
  getSortedByValueOfDescription,
  getIncomesAndCosts,
  getBalanceTransactions,
  getIncomesForMain,
  getCostsForMain,
  getStatisticsCosts,
  getStatisticsIncomes,
};
