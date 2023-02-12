const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware')

const {
  getRawPhotosURLs,
  getPhotoById,
  getUsersPhotosByUsername,
} = require("../controllers/photoController");

router.get("/", protect, getRawPhotosURLs);

router.get("/:id", getPhotoById);

router.get("/user/:username", getUsersPhotosByUsername);

module.exports = router;
