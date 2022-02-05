const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { colors } = require("./helpers");

dotenv.config({ path: "./config/.env" });

const balanceRouter = require("./routes/balanceRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", balanceRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = error.status || 500;
  const status = statusCode === 500 ? "fail" : "error";
  res.status().json({
    status: statusCode,
    code: status,
    message: err.message,
  });
});

module.exports = app;
