const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  setFavorite,
  getUsersFavorites,
  removeFavorite,
  updateFavorite,
} = require("../controllers/favoritesController");

router.route("/").post(protect, setFavorite).get(protect, getUsersFavorites);

router
  .route("/:id")
  .delete(protect, removeFavorite)
  .put(protect, updateFavorite);

module.exports = router;
