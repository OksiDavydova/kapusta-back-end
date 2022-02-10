const setStartOfSearch = (req, res, next) => {
  let numberOfMonthsAgo = req.query.month;
  let startOfSearch = "";

  let numberOfYearsAgo = Math.floor(numberOfMonthsAgo / 12);
  let currentNumberOfMonthAgo = numberOfMonthsAgo - numberOfYearsAgo * 12;

  let currentMonth = new Date().getMonth() + 1 - currentNumberOfMonthAgo;
  let currentYear = new Date().getFullYear() - numberOfYearsAgo;

  if (currentMonth < 1) {
    currentMonth = 12 + currentMonth;
    currentYear = currentYear - 1;
  }

  if (currentMonth < 10) {
    startOfSearch = `${currentYear.toString()}0${currentMonth.toString()}01`;
  } else {
    startOfSearch = `${currentYear.toString()}${currentMonth.toString()}01`;
  }

  console.log(startOfSearch);

  req.startOfSearch = startOfSearch;
  next();
};

module.exports = setStartOfSearch;
