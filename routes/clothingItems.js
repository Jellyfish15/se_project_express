const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");

router.post("/", auth, createItem);

router.delete("/:itemId", auth, deleteItem);

router.put("/:itemId/likes", auth, likeClothingItem);

router.delete("/:itemId/likes", auth, unlikeClothingItem);

module.exports = router;
