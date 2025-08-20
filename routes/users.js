const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      return user.comparePassword(password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).send({ message: "Invalid email or password" });
        }
        const token = user.generateAuthToken();
        res.send({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
    });
});

module.exports = router;
