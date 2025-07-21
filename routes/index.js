const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

// router.use("/clothing-items", clothingItemsRouter);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
