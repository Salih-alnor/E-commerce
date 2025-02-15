const express = require("express");
const router = express.Router();
const { auth, allowedToAccess } = require("../controllers/authController");

const { createCashOrder, createCheckoutSessions } = require("../controllers/orderController");


router.route("/cash/:cartId").post(auth, allowedToAccess("user"), createCashOrder)
router.route("/checkout/:cartId").post(auth, allowedToAccess("user"), createCheckoutSessions)

module.exports = router;