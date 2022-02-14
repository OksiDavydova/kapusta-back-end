const Transaction = require("../../models/Transaction");
const mongoose = require("mongoose");
const { Types } = mongoose;

const getSortedByValueOfDescription = async (id, start, end) => {
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
      $group: {
        _id: {
          description: "$description",
          category: "$category",
          income: "$income",
        },
        totalDescription: { $sum: "$value" },
      },
    },

    {
      $sort: { totalDescription: -1 },
    },
  ]);
  return data;
};

module.exports = getSortedByValueOfDescription;
