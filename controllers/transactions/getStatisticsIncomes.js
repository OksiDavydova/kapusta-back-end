const Transaction = require("../../models/Transaction");
const mongoose = require("mongoose");
const { Types } = mongoose;

const getStatisticsIncomes = async (id, start, end) => {
  const startOfPeriod = start.toString();
  const endOfPeriod = end.toString();

  const data = await Transaction.aggregate([
    {
      $match: {
        $and: [
          { owner: Types.ObjectId(id) },
          { income: true },
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
      $sort: { date: -1, updatedAt: -1 },
    },
  ]);
  return data;
};

module.exports = getStatisticsIncomes;
