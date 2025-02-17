const express = require("express");
const router = express.Router();
const { auth, allowedToAccess } = require("../controllers/authController");

const { createCashOrder, createCheckoutSessions, getOrdersByUser } = require("../controllers/orderController");


router.route("/cash/:cartId").post(auth, allowedToAccess("user"), createCashOrder)
router.route("/checkout/:cartId").post(auth, allowedToAccess("user"), createCheckoutSessions)

router.route("/get-orders").get(auth, allowedToAccess("user", "admin"), getOrdersByUser)

module.exports = router;