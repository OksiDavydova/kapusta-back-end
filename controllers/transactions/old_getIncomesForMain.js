const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { resultsOfLastSixMonths } = require("../../helpers/statistic");

const getIncomesForMain = async (req, res) => {
  const { token } = req.user;
  const { email } = req.user;
  console.log("getBalanceTransactions: ", token);
  console.log("getBalanceTransactions: ", email);
  try {
    const gottenData = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/statisticsincomes/lastsixmonths`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const lastSixMonths = resultsOfLastSixMonths(gottenData.data.data);

    return res.status(StatusCodes.OK).json({
      messaage: "ok",
      code: StatusCodes.OK,
      data: lastSixMonths,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};
module.exports = getIncomesForMain;
