const mongoose = require("mongoose");

const favoritePhotoModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  url: {
    type: String,
    required: [true, "Please add the photo's raw url"],
  },
  description: { type: String },
  username: {
    type: String,
    required: [
      true,
      "Please add the Unsplash user's username associated with the photo url",
    ],
  },
});

module.exports = mongoose.model("Favorite", favoritePhotoModel);
