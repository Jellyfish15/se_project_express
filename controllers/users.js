const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const auth = require("../middlewares/auth");

const { JWT_SECRET = "dev-secret" } = process.env;

const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require("../utils/customErrors");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      next(err);
    });
};
const getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequestError("The id string is in an invalid format")
        );
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name, avatar } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        email,
        password: hash,
        name,
        avatar,
      });
    })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequestError("The id string is in an invalid format")
        );
      }
      next(err);
    });
};

const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.status(200).send(user); // Make sure this sends the updated user object
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new BadRequestError("Invalid email or password"));
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
