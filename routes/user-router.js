const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  verifyToken,
  getUser,
} = require("../controllers/user-controller");

router.post("/sign-up", createUser);
router.post("/log-in", login);
router.get("/user", verifyToken, getUser);

module.exports = router;
