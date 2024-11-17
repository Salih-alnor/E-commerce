const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addToFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  clearFavorites,
} = require("../controllers/favoriteController");

router
  .route("/:productId")
  .post(addToFavorite)
  .get(getFavorite)
  .delete(deleteFavorite);
router.route("/").get(getFavorites).delete(clearFavorites);

module.exports = router;
