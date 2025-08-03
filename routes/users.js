const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.post("/", createUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
