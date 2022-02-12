const getNextMonth = require("./getNextMonth");

const setPeriodOfSearchByParams = (req, res, next) => {
  let period = req.params.period ? req.params.period.toString() : "0";
  let startOfPeriod;
  let endOfPeriod;

  if (period === "lastsixmonths") {
    endOfPeriod = getNextMonth();
    let month = Number(endOfPeriod.slice(4, 6));

    if (month > 6) {
      startOfPeriod =
        endOfPeriod.slice(0, 4).toString() + "0" + (month - 6).toString();
    } else {
      let year = endOfPeriod.slice(0, 4);
      if (month < 4) {
        startOfPeriod =
          (year - 1).toString() + "0" + (12 - (6 - month)).toString();
      } else {
        startOfPeriod = (year - 1).toString() + (12 - (6 - month)).toString();
      }
    }
  }

  if (period.length === 4) {
    startOfPeriod = Number(period);
    endOfPeriod = startOfPeriod + 1;
  }

  if (period.length === 6) {
    let month = period.slice(4);
    if (month == 12) {
      let year = period.slice(0, 4);
      endOfPeriod = (Number(year) + 1).toString() + "01";
    } else {
      endOfPeriod = Number(period) + 1;
    }
    startOfPeriod = Number(period);
  }

  req.startOfPeriod = startOfPeriod.toString();
  req.endOfPeriod = endOfPeriod.toString();

  next();
};

module.exports = setPeriodOfSearchByParams;
