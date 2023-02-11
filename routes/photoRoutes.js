const express = require("express");
const axios = require("axios");
const router = express.Router();

const API = "https://api.unsplash.com/photos/";

router.route("/").get(async (req, res) => {
  try {
    const response = await axios.get(
      `${API}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photos = response.data;
    const rawUnsplashPhotoURLs = photos.map((photo) => photo.urls.raw);
    res.status(200).send(rawUnsplashPhotoURLs);
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${API}/${id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photo = response.data;

    res.status(200).send(photo);
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

module.exports = router;

