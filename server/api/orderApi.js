const express = require("express");
const router = express.Router();
const { auth, allowedToAccess } = require("../controllers/authController");

const {
  createCashOrder,
  createCheckoutSessions,
  createPayPalOrder,
  getOrdersByUser,
} = require("../controllers/orderController");

router
  .route("/cash/:cartId")
  .post(auth, allowedToAccess("user"), createCashOrder);
router
  .route("/checkout/:cartId")
  .post(auth, allowedToAccess("user"), createCheckoutSessions);
router
  .route("/paypal/:cartId")
  .post(auth, allowedToAccess("user"), createPayPalOrder);
router.route("/").get(auth, allowedToAccess("user", "admin"), getOrdersByUser);

module.exports = router;
