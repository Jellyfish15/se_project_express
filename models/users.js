const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
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
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Incorrect email or password");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
