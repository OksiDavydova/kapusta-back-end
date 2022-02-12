const Transaction = require("../../models/Transaction");
const mongoose = require("mongoose");
const { Types } = mongoose;

const getAllIncomesAndCosts = async (id, start, end) => {
  const startOfPeriod = start.toString();
  const endOfPeriod = end.toString();

  const data = await Transaction.aggregate([
    {
      $match: {
        $and: [
          { owner: Types.ObjectId(id) },
          {
            date: {
              $gte: startOfPeriod,
              $lt: endOfPeriod,
            },
          },
        ],
      },
    },

    {
      $group: { _id: { income: "$income" }, total: { $sum: "$value" } },
    },
    {
      $project: { _id: 0, income: "$_id.income", total: "$total" },
    },
  ]);
  return data;
};

module.exports = getAllIncomesAndCosts;
