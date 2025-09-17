const express = require("express");

const router = express.Router();

const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

const { login, createUser } = require("../controllers/users");
const {
  validateUser,
  loginAuthentication,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");
const { getItems } = require("../controllers/clothingItems");

router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);

router.post("/signin", loginAuthentication, login);
router.post("/signup", validateUser, createUser);
router.get("/items", getItems);

const { NotFoundError } = require("../utils/customErrors");

router.use((req, res, next) => {
  next(new NotFoundError("Not Found"));
});

router.use(auth);

router.use("/items", clothingItemsRouter);

module.exports = router;
