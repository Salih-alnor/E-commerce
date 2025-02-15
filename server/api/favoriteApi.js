const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addToFavorite,
  getFavorites,
  deleteFavorite,
  clearFavorites,
} = require("../controllers/favoriteController");

const { auth, allowedToAccess } = require("../controllers/authController");

router
  .route("/:productId")
  .post(auth, allowedToAccess("user"), addToFavorite)
  .delete(auth, allowedToAccess("user"),deleteFavorite);
router
  .route("/")
  .get(auth, allowedToAccess("user"), getFavorites)
  .delete(auth, allowedToAccess("user"), clearFavorites);

module.exports = router;
