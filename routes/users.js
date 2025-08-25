const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  createItem,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

router.get("/", auth, getUsers);
router.get("/:userId", auth, getUser);

router.post("/", createUser);

module.exports = router;
