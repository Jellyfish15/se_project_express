const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const clothingItemsRouter = require("./routes/clothingItems");
const userRouter = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
app.use(cors());
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", require("./controllers/clothingItems").getItems);

app.use(auth);
app.use("/items", clothingItemsRouter);
app.use("/users", userRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
