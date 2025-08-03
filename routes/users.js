const router = require("express").Router();
const {
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

router.get("/me", getCurrentUser);
router.post("/", createUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
