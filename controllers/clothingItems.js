const ClothingItems = require("../models/clothingItems");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// const returnResoponse = (err) => {
//   // iff error is a validation error
// };

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItems.create({ name, weather, imageURL: imageUrl, owner })
    .then((item) => {
      const { imageURL } = item;
      res.status(201).send({ ...item.toObject(), imageUrl: imageURL });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItems.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};
const getItemById = (req, res) => {
  ClothingItems.findById(req.params.itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      // if (err.name  === "CastError") {
      // return res.status(BAD_REQUEST).send({ message: 'Bad Request' });
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItems.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};
const likeClothingItem = (req, res) => {
  const userId = req.user._id;
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};
const unlikeClothingItem = (req, res) => {
  const userId = req.user._id;
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};
module.exports = {
  createItem,
  getItems,
  getItemById,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
};
