const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
  email: {
    type: String,
    required: [true, "The email field is required."],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required."],
    select: false,
  },
});
userSchema.statics.findUserByCredentials = async function (email, password) {
  const User = this;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Incorrect email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect email or password");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
