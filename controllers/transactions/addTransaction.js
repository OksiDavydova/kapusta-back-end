const Transaction = require("../../models/Transaction");

const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res
      .status(201)
      .json({ message: "ok", code: 201, data: transaction });
  } catch (error) {
    res.status(400).json({ message: "Cannot add transaction", code: 400 });
  }
};

module.exports = addTransaction;
