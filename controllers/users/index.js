const aggregation = require("./aggregation");
const aggregationBySorted = require("./aggregationBySorted");
const aggregationAll = require("./aggregationAll");

const balance = require("./setBalance");
//const current = require("./getBalance");
const verifyUser = require("./verifyUser");
const repeatEmailForVerifyUser = require("./repeatEmailForVerifyUser");

module.exports = {
  verifyUser,
  repeatEmailForVerifyUser,
  balance,
  current,
  aggregation,
  aggregationBySorted,
  aggregationAll,
};
