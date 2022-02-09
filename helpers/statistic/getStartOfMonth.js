const getStartOfMonth = (numberOfMonthsAgo = 0) => {
  let numberOfYearsAgo = Math.floor(numberOfMonthsAgo / 12);
  let currentNumberOfMonthAgo = numberOfMonthsAgo - numberOfYearsAgo * 12;

  let currentMonth = new Date().getMonth() + 1 - currentNumberOfMonthAgo;
  let currentYear = new Date().getFullYear() - numberOfYearsAgo;

  if (currentMonth < 1) {
    currentMonth = 12 + currentMonth;
    currentYear = currentYear - 1;
  }

  if (currentMonth < 10) {
    return `${currentYear.toString()}0${currentMonth.toString()}01`;
  }
  return `${currentYear.toString()}${currentMonth.toString()}01`;
};
