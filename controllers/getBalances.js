const Balance = require("../models/Balance");

const getBalances = async (req, res) => {
  const balances = await Balance.find();
  console.log(
    "🚀 ~ file: getBalance.js ~ line 5 ~ getBalance ~ balances",
    balances
  );

  return res.status(200).json({
    status: "successful",
    code: 200,
    data: balances,
  });
};

module.exports = getBalances;
