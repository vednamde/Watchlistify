const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add movie to watchlist
router.post("/add", protect, async (req, res) => {
  const { movieId, title, posterPath, releaseDate } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicates
    if (user.watchlist.some(m => m.movieId === movieId)) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    user.watchlist.push({ movieId, title, posterPath, releaseDate });
    await user.save();

    res.status(201).json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user watchlist
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove movie from watchlist
router.delete("/remove/:movieId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const beforeLength = user.watchlist.length;
    user.watchlist = user.watchlist.filter(m => m.movieId !== req.params.movieId);

    if (beforeLength === user.watchlist.length) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    await user.save();
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
