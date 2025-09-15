require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const clothingItemsRouter = require("./routes/clothingItems");
const userRouter = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { NOT_FOUND } = require("./utils/errors");
const mainRouter = require("./routes/index");
const errorHandler = require("./utils/errorHandler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);
app.use(requestLogger);
app.use(errorLogger);
// Celebrate error handler
app.use(errors());
// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
