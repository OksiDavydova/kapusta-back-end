const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { colors } = require("./helpers");
const { StatusCodes } = require("http-status-codes");

dotenv.config({ path: "./config/.env" });

const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const transactionsRouter = require("./routes/transactionsRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";


//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/transactions", transactionsRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "error",
    code: StatusCodes.NOT_FOUND,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const status =
    statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? "fail" : "error";
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: status,
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
