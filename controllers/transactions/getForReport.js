const axios = require("axios");
const { StatusCodes } = require("http-status-codes");

const getForReport = async (req, res) => {
  const { token } = req.user;
  const period = req.params.period;

  try {
    const dataByDescription = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/sorted/${period}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const transactionsByDescription = dataByDescription.data.data;

    const gottenData = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/transactions/incomesandcosts/${period}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let sumOfIncomes = gottenData.data.data.filter(
      (el) => el.income === true
    )[0]?.total;

    let sumOfCosts = gottenData.data.data.filter((el) => el.income === false)[0]
      ?.total;

    sumOfIncomes = sumOfIncomes ? sumOfIncomes : 0;
    sumOfCosts = sumOfCosts ? sumOfCosts : 0;

    return res.status(StatusCodes.OK).json({
      messaage: "ok",
      code: StatusCodes.OK,
      data: {
        transactionsByDescription,
        sumOfIncomes,
        sumOfCosts,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};
module.exports = getForReport;
