const ClothingItems = require("../models/clothingItems");

const createItem = (req, res) => {
  const owner = "60d0fe4f5311236168a109ca";
  const { name, weather, imageUrl } = req.body;
  ClothingItems.create({ name, weather, imageURL: imageUrl, owner })
    .then((item) => {
      const { name, weather, imageURL, _id, owner, likes, createdAt, __v } =
        item;
      res.status(201).send({
        name,
        weather,
        imageUrl: imageURL,
        _id,
        owner,
        likes,
        createdAt,
        __v,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItems.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
const getItemById = (req, res) => {
  ClothingItems.findById(req.params.itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItems.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItems.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};
const likeClothingItem = (req, res) => {
  const userId = "60d0fe4f5311236168a109ca"; // or req.user._id if using auth
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};
const unlikeClothingItem = (req, res) => {
  const userId = "60d0fe4f5311236168a109ca"; // or req.user._id if using auth
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};
module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
};
