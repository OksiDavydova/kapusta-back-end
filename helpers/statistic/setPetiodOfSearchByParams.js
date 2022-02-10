const setPeriodOfSearchByParams = (req, res, next) => {
  let startOfPeriod = req.params.period ? req.params.period.toString() : 0;
  let endOfPeriod;

  console.log(`I'm setPeriodOfSearchByParams`);

  if (startOfPeriod.leng === 4) {
    endOfPeriod = startOfPeriod.toNumber();
  }

  if (startOfPeriod.length === 4) {
    endOfPeriod = Number(startOfPeriod) + 1;
  }
  if (startOfPeriod.toString().length === 6) {
    let month = startOfPeriod.slice(4);
    if (month === "12") {
      let year = startOfPeriod.slice(0, 4);
      endOfPeriod = (Number(year) + 1).toString() + "01";
    } else {
      endOfPeriod = Number(startOfPeriod) + 1;
    }
  }

  req.startOfPeriod = startOfPeriod;
  req.endOfPeriod = endOfPeriod;
  next();
};

module.exports = setPeriodOfSearchByParams;
