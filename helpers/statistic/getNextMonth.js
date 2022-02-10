const getNextMonth = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  let currentYearAndMonth;

  if (currentMonth < 10) {
    currentYearAndMonth = `${currentYear.toString()}0${currentMonth.toString()}`;
  } else {
    currentYearAndMonth = `${currentYear.toString()}${currentMonth.toString()}`;
  }

  return currentYearAndMonth;
};

module.exports = getNextMonth;
