const getStartOfMonth = (req, res, next) => {
  let startOfMonth = "";

  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();

  if (currentMonth < 1) {
    currentMonth = 12 + currentMonth;
    currentYear = currentYear - 1;
  }

  if (currentMonth < 10) {
    startOfMonth = `${currentYear.toString()}0${currentMonth.toString()}01`;
  } else {
    startOfMonth = `${currentYear.toString()}${currentMonth.toString()}01`;
  }

  req.startOfSearch = startOfMonth;

  console.log("END_getStartOfMonth: ", startOfMonth);
  // return req.startOfMonth;
  next();
};

module.exports = getStartOfMonth;
