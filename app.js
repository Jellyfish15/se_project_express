const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { PORT = 3001 } = process.env;
const CORS = require("cors");

const app = express();

app.use(CORS());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use("/", mainRouter);
console.log(mainRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
