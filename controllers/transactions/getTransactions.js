const { StatusCodes } = require("http-status-codes");
const Transaction = require("../../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res
      .status(StatusCodes.OK)
      .json({
        message: "ok",
        code: StatusCodes.OK,
        data: transactions,
        count: transactions.length,
      });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};

module.exports = getTransactions;
