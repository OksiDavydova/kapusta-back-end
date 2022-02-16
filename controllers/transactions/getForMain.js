const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { resultsOfLastSixMonths } = require("../../helpers/statistic");
const { formatDate } = require("../../helpers");

const getForMain = async (req, res) => {
  const { token } = req.user;

  try {
    const costs = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/statisticscosts/lastsixmonths`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const incomes = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/statisticsincomes/lastsixmonths`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const transaction = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/statistics/lastsixmonths`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const lastSixMonthsTransaction = formatDate(transaction.data.data);

    const gottenData = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/incomesandcosts/`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let sumOfIncomes = gottenData.data.data.filter(
      (el) => el.income === true
    )[0]?.total;
    let sumOfCosts = gottenData.data.data.filter((el) => el.income === false)[0]
      ?.total;

    sumOfIncomes = sumOfIncomes ? sumOfIncomes : 0;
    sumOfCosts = sumOfCosts ? sumOfCosts : 0;

    const balance = sumOfIncomes - sumOfCosts;

    const lastSixMonthsCosts = resultsOfLastSixMonths(costs.data.data);
    const lastSixMonthsIncomes = resultsOfLastSixMonths(incomes.data.data);

    return res.status(StatusCodes.OK).json({
      messaage: "ok",
      code: StatusCodes.OK,
      data: {
        lastSixMonthsCosts,
        lastSixMonthsIncomes,
        lastSixMonthsTransaction,
        balance,
        sumOfIncomes,
        sumOfCosts,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};

module.exports = getForMain;
