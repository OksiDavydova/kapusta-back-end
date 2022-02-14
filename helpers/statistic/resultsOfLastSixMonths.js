const getNextMonth = require("./getNextMonth");

const resultsOfLastSixMonths = (arr) => {
  let result = [];

  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  endOfPeriod = getNextMonth();
  let month = Number(endOfPeriod.slice(4, 6));
  const indexOfMonth = month - 2;

  let year = endOfPeriod.slice(0, 4);
  for (let i = 0; i < 6; i += 1) {
    if (month - i > 9) {
      endOfPeriod = year.toString() + (month - i).toString();
    } else if (month - i > 0) {
      endOfPeriod = year.toString() + "0" + (month - i).toString();
    } else if (month - i > -3) {
      endOfPeriod = (year - 1).toString() + (12 - (i - month)).toString();
    } else {
      endOfPeriod = (year - 1).toString() + "0" + (12 - (i - month)).toString();
    }

    let startOfPeriod = (Number(endOfPeriod) - 1).toString();

    if (Number(startOfPeriod.slice(4, 6)) === 0) {
      startOfPeriod = (year - 1).toString() + "12";
    }

    let index = (indexOfMonth - i).toString();
    if (index < 0) {
      index = (12 + Number(index)).toString();
    }

    const nameOfMonth = months[index];
    const obj = {};

    const filteredMonth = arr.filter(
      (el) => el.date > startOfPeriod && el.date < endOfPeriod
    );
    const totalOfMonth = filteredMonth.reduce((acc, el) => acc + el.value, 0);
    obj[nameOfMonth] = totalOfMonth;
    result.push(obj);
  }

  return result;
};

module.exports = resultsOfLastSixMonths;
