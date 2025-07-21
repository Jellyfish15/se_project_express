const router = require("express").Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);
router.get("/", getItems);
router.get("/:itemId", getItemById);
router.put("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);

// Add like
router.put("/:itemId/likes", likeClothingItem);

// Remove like
router.delete("/:itemId/likes", unlikeClothingItem);

module.exports = router;
