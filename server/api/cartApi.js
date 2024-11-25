const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    addToCart,
    getCartProducts
} = require("../controllers/cartController");

router
  .route("/")
  .post(addToCart)
  // .get(getCartProducts)

  router.use("/:id", getCartProducts )
// router.route("/").get(getFavorites).delete(clearFavorites);

module.exports = router;