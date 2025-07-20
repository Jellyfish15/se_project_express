const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/clothing-items", clothingItemsRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(400).send({ message: "Not Found" });
});

module.exports = router;
