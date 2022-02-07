const { StatusCodes } = require("http-status-codes");
const Transaction = require("../../models/Transaction");

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Cannot remove with id: ${req.params.id}`,
        code: StatusCodes.BAD_REQUEST,
      });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "ok", code: StatusCodes.OK, data: transaction });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};

module.exports = deleteTransaction;
