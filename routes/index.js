const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");

// router.use("/clothing-items", clothingItemsRouter);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Not Found" });
});

module.exports = router;
