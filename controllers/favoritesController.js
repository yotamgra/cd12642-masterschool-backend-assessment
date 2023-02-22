//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const Favorite = require("../models/favoritePhotoModel");

//@desc    Set favorite
//@route   POST /api/favorites
//@access  Private
const setFavorite = asyncHandler(async (req, res) => {
  const { url, description, username, explanation } = req.body;

  if (!url || !description || !username || !explanation) {
    res.status(400);
    throw new Error("Favorite url, description and username are required");
  }

  const favorite = await Favorite.create({
    user: req.user.id,
    url,
    description,
    explanation,
    username,
  });
  res.status(201).json(favorite);
});

//@desc    Get favorites
//@route   GET /api/favorites
//@access  Private
const getUsersFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id });
  res.status(200).send(favorites);
});

//@desc    Delete favorite
//@route   DELETE  /api/favorites/:id
//@access  Private
const removeFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);

  if (!favorite) {
    res.status(400);
    throw new Error("Favorite not found");
  }
  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the loggedin user matches the favorite's user
  if (favorite.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await favorite.remove();
  res.status(200).json({ id: req.params.id });
});

//@desc    Update explanation's favorite
//@route   PUT /api/favorites/:id
//@access  Private
const updateFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);
  if (!favorite) {
    res.status(400);
    throw new Error("Favorite not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the loggedin user matches the favorite's user
  if (favorite.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const { explanation } = req.body;
  if (!explanation) {
    res.status(400);
    throw new Error("Explanation not found");
  }

  const updatedFavorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    { explanation },
    { new: true }
  );
  res.status(200).json(updatedFavorite);
});

module.exports = {
  setFavorite,
  getUsersFavorites,
  removeFavorite,
  updateFavorite,
};
