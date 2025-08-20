const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "",
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return !value || validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    default: "",
  },
});
module.exports = mongoose.model("User", userSchema);
