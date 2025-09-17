const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return !value || validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    required: true,
  },
});
userSchema.statics.findUserByCredentials = async function (email, password) {
  // console.log("findUserByCredentials", email, password);
  const User = this;

  const user = await User.findOne({ email }).select("+password");
  // console.log("user", user);

  if (!user) {
    throw new Error("Incorrect email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  // console.log("isMatch", isMatch);
  if (!isMatch) {
    throw new Error("Incorrect email or password");
  }

  // console.log("returning user", user);
  return user;
};
module.exports = mongoose.model("User", userSchema);
