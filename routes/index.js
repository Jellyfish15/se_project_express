const express = require("express");

const router = express.Router();

const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");

const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { getItems } = require("../controllers/clothingItems");

router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getItems);

router.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

router.use(auth);

router.use("/items", clothingItemsRouter);

module.exports = router;
