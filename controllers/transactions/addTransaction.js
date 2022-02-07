const { StatusCodes } = require("http-status-codes");
const Transaction = require("../../models/Transaction");

const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "ok", code: StatusCodes.CREATED, data: transaction });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};

module.exports = addTransaction;
