const router = require("express").Router();
const express = require("express");
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");

const app = express();
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { getItems } = require("../controllers/clothingItems");

router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Not Found" });
});

app.use(express.json());

app.use(auth);

app.use("/items", clothingItemsRouter);

module.exports = router;
