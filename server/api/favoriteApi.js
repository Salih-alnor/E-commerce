const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addToFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  clearFavorites,
} = require("../controllers/favoriteController");

const { auth, allowedToAccess } = require("../controllers/authController");

router
  .route("/:productId")
  .post(auth, allowedToAccess("user", "admin"), addToFavorite)
  .get(auth, allowedToAccess("user", "admin"), getFavorite)
  .delete(deleteFavorite);
router
  .route("/")
  .get(auth, allowedToAccess("user", "admin"), getFavorites)
  .delete(auth, allowedToAccess("user", "admin"), clearFavorites);

module.exports = router;
