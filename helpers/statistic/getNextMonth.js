const getNextMonth = () => {
  const date = new Date();
  const month = date.getMonth();

  const year = date.getFullYear();

  let yearAndNextMonth;

  if (month < 11) {
    const nextMonth = month + 2;
    if (nextMonth < 10) {
      yearAndNextMonth = `${year.toString()}0${nextMonth.toString()}`;
    } else {
      yearAndNextMonth = `${year.toString()}${nextMonth.toString()}`;
    }
  } else {
    const nextYear = year + 1;
    yearAndNextMonth = `${nextYear.toString()}01`;
  }

  return yearAndNextMonth;
};

module.exports = getNextMonth;
