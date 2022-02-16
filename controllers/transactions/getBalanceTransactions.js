const axios = require("axios");
const { StatusCodes } = require("http-status-codes");

const getBalanceTransactions = async (req, res) => {
  const { token } = req.user;
  const { email } = req.user;

  try {
    const gottenData = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/incomesandcosts/`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const incomes = gottenData.data.data.filter((el) => el.income === true)[0]
      .total;
    const costs = gottenData.data.data.filter((el) => el.income === false)[0]
      .total;

    const balance = incomes - costs;

    const userBalance = {
      total: balance,
      income: incomes,
      expense: costs,
    };

    return res.status(StatusCodes.OK).json({
      messaage: "ok",
      code: StatusCodes.OK,
      data: userBalance,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};
module.exports = getBalanceTransactions;
