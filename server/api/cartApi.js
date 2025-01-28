const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addToCart,
  getCartProducts,
  deleteProduct,
} = require("../controllers/cartController");

const { auth, allowedToAccess } = require("../controllers/authController");

router.route("/:id").post(auth, allowedToAccess("user", "admin"), addToCart);

router.delete("/:productId", auth, allowedToAccess("user", "admin"), deleteProduct);

router.get("/", auth, allowedToAccess("user", "admin"), getCartProducts);

module.exports = router;
