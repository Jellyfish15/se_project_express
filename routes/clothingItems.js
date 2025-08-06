const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.delete("/:itemId", deleteItem);

router.put("/:itemId/likes", likeClothingItem);

router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
