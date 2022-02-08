const { StatusCodes } = require("http-status-codes");
const Transaction = require("../../models/Transaction");

const getTransactions = async (req, res) => {
  const { id: userID } = req.user;

  try {
    const transactions = await Transaction.find({ owner: userID });
    return res.status(StatusCodes.OK).json({
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
