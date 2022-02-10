const getCurrentDate = () => {
  const Date = new Date();
  const currentMonth = Date.getMonth() + 1;
  const currentYear = Date.getFullYear();
  const currentDay = Date.getDate();

  let currentDate;

  if (currentMonth < 10) {
    currentDate = `${currentYear.toString()}0${currentMonth.toString()}${currentDay.toString()}`;
  } else {
    currentDate = `${currentYear.toString()}${currentMonth.toString()}${currentDay.toString()}`;
  }

  console.log(currentDate);
  return currentDate;
};

module.exports = getCurrentDate;
