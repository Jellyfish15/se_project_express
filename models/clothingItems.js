const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./users");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Link is not Valid",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("ClothingItems", clothingItemSchema);
