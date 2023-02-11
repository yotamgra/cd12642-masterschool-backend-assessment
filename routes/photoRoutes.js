const express = require("express");
const axios = require("axios");
const router = express.Router();

const {
  getRawPhotosURLs,
  getPhotoById,
  getUsersPhotosByUsername,
} = require("../controllers/photoController");

router.get("/", getRawPhotosURLs);

router.get("/:id", getPhotoById);

router.get("/user/:username", getUsersPhotosByUsername);

module.exports = router;


