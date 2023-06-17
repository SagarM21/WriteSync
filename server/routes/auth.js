const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, profilePic } = req.body;
    // already exists email
    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        email: email,
        profilePic: profilePic,
        name: name,
      });
      user = await user.save();
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ user, token: req.token });
});

module.exports = authRouter;
