const ClothingItems = require("../models/clothingItems");
const { BAD_REQUEST, NOT_FOUND, FORBIDDEN } = require("../utils/errors");

const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new CustomError("Invalid data", BAD_REQUEST, "Bad Request"));
      }
      next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItems.find({})
    .then((items) => res.status(200).json(items))
    .catch((err) => {
      next(err);
    });
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItems.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).json({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItems.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      if (String(item.owner) !== String(userId)) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }
      return ClothingItems.findByIdAndDelete(itemId).then(() =>
        res.status(200).json({ message: "Item deleted successfully" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new CustomError("Invalid item ID", 400, BAD_REQUEST));
      }
      next(err);
    });
};

const likeClothingItem = (req, res, next) => {
  const userId = req.user._id;
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      return res.status(200).json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      next(err);
    });
};
const unlikeClothingItem = (req, res, next) => {
  const userId = req.user._id;
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      return res.json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      next(err);
    });
};
module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeClothingItem,
  unlikeClothingItem,
};
