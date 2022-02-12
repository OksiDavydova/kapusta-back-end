const Transaction = require("../../models/Transaction");
const mongoose = require("mongoose");
const { Types } = mongoose;

const getStatistics = async (id, category) => {
  const data = await Transaction.aggregate([
    {
      $match: {
        $and: [{ owner: Types.ObjectId(id) }, { category: category }],
      },
    },
    {
      $group: {
        _id: "$description",
        total: { $sum: "$value" },
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);
  return data;
};

module.exports = getStatistics;
