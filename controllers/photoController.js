//Require axios to make API calls
const axios = require("axios");

const API = "https://api.unsplash.com/";

//@desc    Get raw Unsplash photo URLs
//@route   GET /api/phtos
//@access  Public
const getRawPhotosURLs = async (req, res) => {
  try {
    console.log("try");
    const response = await axios.get(
      `${API}photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photos = response.data;
    const rawUnsplashPhotoURLs = photos.map((photo) => photo.urls.raw);
    res.status(200).send(rawUnsplashPhotoURLs);
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

//@desc    Get  Unsplash photo object by id
//@route   GET /api/phtos/:id
//@access  Public
const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${API}photos/${id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photo = response.data;

    res.status(200).send(photo);
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

//@desc    Get  Unsplash photo object by id
//@route   GET /api/phtos/:id
//@access  Public

const getUsersPhotosByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `${API}users/${username}/photos?client_i=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const usersPhotos = response.data;

    res.status(200).send(usersPhotos);
  } catch (error) {
    const statusCode = error.response.status;
    const errorMessage = error.message;

    res.status(statusCode).json({ message: errorMessage });
  }
};

module.exports = {
  getRawPhotosURLs,
  getPhotoById,
  getUsersPhotosByUsername,
};
