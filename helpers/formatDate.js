const formatDate = (arr) => {
  const result = arr.map((el) => {
    const year = el.date.slice(0, 4);
    const month = el.date.slice(4, 6);
    const day = el.date.slice(6);
    const date = `${day}.${month}.${year}`;
    el.date = date;
    return el;
  });
  return result;
};

module.exports = formatDate;
