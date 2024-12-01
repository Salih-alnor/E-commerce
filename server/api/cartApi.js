const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    addToCart,
    getCartProducts,
    deleteProduct
} = require("../controllers/cartController");

router
  .route("/")
  .post(addToCart)
  .delete(deleteProduct)
  

  router.use("/:id", getCartProducts )
 
// router.route("/").get(getFavorites).delete(clearFavorites);

module.exports = router;