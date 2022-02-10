const getNextMonth = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // console.log("CURRENT MONTHT: ", currentMonth);
  let currentYearAndMonth;

  //  if (currentMonth < 1) {
  //    currentMonth = 12 + currentMonth;
  //    currentYear = currentYear - 1;
  //  }

  if (currentMonth < 10) {
    currentYearAndMonth = `${currentYear.toString()}0${currentMonth.toString()}`;
  } else {
    currentYearAndMonth = `${currentYear.toString()}${currentMonth.toString()}`;
  }

  // console.log("CURRENT YEAR AND MONTHT: ", currentYearAndMonth);
  currentYearAndMonth = currentYear.toString() + currentMonth.toString();

  // return currentMonth;
  return currentYearAndMonth;
};

module.exports = getNextMonth;
