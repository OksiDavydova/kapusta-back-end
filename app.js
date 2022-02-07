const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { colors } = require("./helpers");
const path = require("path");

dotenv.config({ path: "./config/.env" });

const authRouter = require("./routes/authRouter");
const balanceRouter = require("./routes/balanceRouter");
const transactionsRouter = require("./routes/transactionsRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/users", balanceRouter);
app.use("/auth", authRouter);
app.use("/transactions", transactionsRouter);
app.use("/link", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html")); // стартовая страница. для запуска. потом удалить(поменять)
});

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const status = statusCode === 500 ? "fail" : "error";
  res.status(500).json({
    status: status,
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
