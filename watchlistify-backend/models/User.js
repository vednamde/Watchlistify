const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [
    {
      movieId: String,
      title: String,
      posterPath: String,
      releaseDate: String,
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
