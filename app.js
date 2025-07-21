const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6879c316a2cdf0765d77f683", // Mock user ID for testing
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
