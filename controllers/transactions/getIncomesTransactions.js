const { StatusCodes } = require("http-status-codes");
const Transaction = require("../../models/Transaction");
const getNextMonth = require("../../helpers/statistic/getNextMonth");

const getIncomesTransactions = async (req, res) => {
  const { id: userID } = req.user;

  const startOfPeriod = req.startOfPeriod ? req.startOfPeriod : 0;
  const endOfPeriod = req.endOfPeriod ? req.endOfPeriod : getNextMonth();

  let transactions;
  try {
    transactions = await Transaction.find({
      owner: userID,
      income: true,
      $and: [{ date: { $gt: startOfPeriod } }, { date: { $lt: endOfPeriod } }],
    });

    return res.status(StatusCodes.OK).json({
      message: "ok",
      code: StatusCodes.OK,
      total: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};

module.exports = getIncomesTransactions;
