const { StatusCodes } = require("http-status-codes");
const { getStatisticsCosts } = require("../../controllers/transactions/");
const { getNextMonth } = require("../../helpers/statistic/");
const { CustomError } = require("../../lib/CustomError");

const aggregationCosts = async (req, res, next) => {
  const startOfPeriod = req.startOfPeriod ? req.startOfPeriod : 0;
  const endOfPeriod = req.endOfPeriod ? req.endOfPeriod : getNextMonth();
  const { id } = req.user;

  const data = await getStatisticsCosts(id, startOfPeriod, endOfPeriod);

  if (data) {
    return res
      .status(StatusCodes.OK)
      .json({ status: "success", code: StatusCodes.OK, data });
  }
  throw new CustomError(StatusCodes.NOT_FOUND, "Not found");
};

module.exports = aggregationCosts;
