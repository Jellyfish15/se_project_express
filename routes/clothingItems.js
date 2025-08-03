const router = require("express").Router();

const {
  createItem,
  getItems,
  getItemById,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);
router.get("/", getItems);
router.get("/:itemId", getItemById);

router.delete("/:itemId", deleteItem);

router.put("/:itemId/likes", likeClothingItem);

router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
