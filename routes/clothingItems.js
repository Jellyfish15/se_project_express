const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

router.post("/", auth, validateClothingItem, createItem);

router.delete("/:itemId", auth, validateId, deleteItem);

router.put("/:itemId/likes", auth, validateId, likeClothingItem);

router.delete("/:itemId/likes", auth, validateId, unlikeClothingItem);

module.exports = router;
