const express = require("express");

const router = express.Router();

const { signup, login, profile } = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");
const User = require("../models/User");

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
