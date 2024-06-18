const express = require("express");
const {
  register,
  login,
  logout,
} = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);

module.exports = router;