const getTransactions = require("./getTransactions");

const getTransactionsByMonth = async (req, res) => {
  req.startOfSearch = 20210201;

  try {
    const transactionsByMonth = await getTransactions(req, res);

    return res.status(StatusCodes.OK).json({
      message: "ok",
      code: StatusCodes.OK,
      total: transactionsByMonths.length,
      data: transactionsByMonth,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};

module.exports = getTransactionsByMonth;
