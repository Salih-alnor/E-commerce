const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addToCart,
  getCartProducts,
  deleteProduct,
} = require("../controllers/cartController");

const { auth, allowedToAccess } = require("../controllers/authController");

router
  .route("/")
  .post(auth, allowedToAccess("user", "admin"), addToCart)
  .delete(auth, allowedToAccess("user", "admin"), deleteProduct);

router.use("/:id", auth, allowedToAccess("user", "admin"), getCartProducts);

module.exports = router;
