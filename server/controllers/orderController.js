const stripe = require("stripe")(
  "sk_test_51Qr4PaKg2ri1qMe4DKAB2gQqERZ8AZpfuaW0FqLVnibCumuPbXrqWjvUiF7GGmHA9rhfFeuMSEGNy1sZJ7SL45e6003cCxCmBQ"
);
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const paypal = require("@paypal/checkout-server-sdk");
const { request } = require("express");

/*
  @desc Create cash order
  @route POST /api/order/cash-order
  @access Private
*/

const createCashOrder = asyncHandler(async (req, res, next) => {
  // 1- get cart from cartItems
  const {cartId} = req.params;
  const cart = await Cart.findById(cartId);

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }
  // create order id
  const orderId = Date.now().toString();
  // 2- create cash order
  const order = await Order.create({
    orderId,
    user: req.user._id,
    cartItems: cart.items,
    totalPrice: cart.totalPrice,
  });

  // 3- clear cart items after order has been created
  await Cart.findByIdAndDelete(cartId);

  res.status(201).json({
    status: "success",
    message: "Created cash order successfully!",
    order,
  });
});

/*
  @desc Create checkout order
  @route POST /api/order/checkout-session
  @access Private[user]
*/
const createCheckoutSessions = asyncHandler(async (req, res, next) => {
  // 1- get cart from cartItems
  const { cartId } = req.params;
  const cart = await Cart.findById(cartId);

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  // 2- create checkout session
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    payment_method_types: ["card"], // يمكن إضافة طرق أخرى مثل Apple Pay
    metadata: {
      cartId: cart._id.toString(),
      userId: req.user._id.toString(),
    },
  });

  res.status(200).json({
    status: "success",
    message: "Checkout session created",
    clientSecret: paymentIntent.client_secret,
  });
});

const webHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "whsec_b490a40a6cea8aba1153826eaa5281b5acb2cc90a4ad37da71be32391f10207f"
    );
  } catch (err) {
    console.error("⚠️  Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // التحقق مما إذا كان الدفع ناجحًا
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const cartId = paymentIntent.metadata.cartId;
    const userId = paymentIntent.metadata.userId;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      return next(error);
    }

    const orderId = Date.now().toString();

    // 2- create online transaction order
    const order = await Order.create({
      orderId,
      user: userId,
      paymentMethod: "Card",
      statusPayment: "Paid",
      cartItems: cart.items,
      totalPrice: cart.totalPrice,
    });

    // 3- clear cart items after order has been created
    await Cart.findByIdAndDelete(cartId);
  }

  res.status(200).send("Webhook received");
};

/*
  @desc Create paypal order
  @route POST /api/order/paypal-order
  @access Private[user]
*/

const createPayPalOrder = asyncHandler(async (req, res, next) => {
  // 1- get cart from cartItems
  const { cartId } = req.params;
  const cart = await Cart.findById(cartId);
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  const orderId = Date.now().toString();
  // 2- create paypal order
  const paypalOrder = await Order.create({
    orderId,
    user: req.user._id,
    paymentMethod: "PayPal",
    statusPayment: "Paid",
    cartItems: cart.items,
    totalPrice: cart.totalPrice,
  });
  res.status(200).json({
    status: "success",
    message: "PayPal order created successfully",
    paypalOrder,
  });
  // 3- clear cart items after order has been created
  await Cart.findByIdAndDelete(cartId);
  // // 4- send email to user
  // sendEmail(req.user, paypalOrder);
  // // 5- send notification to admin
  // sendNotificationToAdmin(orders);
  // // 6- send notification to user
  // sendNotificationToUser(req.user, orders);
  // // 7- update user's cart status to "Completed"
  // updateUserCartStatus(req.user, "Completed");
  // // 8- update products stocks
  // updateProductsStocks(cart.items);
  // // 9- update products ratings and reviews
  // updateProductsRatingsAndReviews(cart.items);
  // // 10- update products sales count
  // updateProductsSalesCount(cart.items);
  // // 11- update products best sellers list
  // updateProductsBestSellersList(cart.items);
  // // 12- update user's total purchases count
  // updateUserTotalPurchasesCount(req.user);
  // // 13- update user's total purchases amount
  // updateUserTotalPurchasesAmount(req.user);
  // // 14- update user's last purchase date
  // updateUserLastPurchaseDate(req.user);
  // // 15- update user's total purchases value
  // updateUserTotalPurchasesValue(req.user);
  // // 16- update user's total purchases frequency
  // updateUserTotalPurchasesFrequency(req.user);
  // // 17- update user's total purchases duration
  // updateUserTotalPurchasesDuration(req.user);
});

const getOrdersByUser = asyncHandler(async (req, res, next) => {
  // 1- get user id
  const userId = req.user._id;

  // 2- get orders by user id
  const orders = await Order.find({ user: userId }).populate(
    "cartItems.productId"
  );

  if (!orders) {
    const error = new Error("Orders not found");
    error.statusCode = 404;
    return next(error);
  }

  res.json({ status: "success", results: orders.length, orders: orders });
});

module.exports = {
  createCashOrder,
  createCheckoutSessions,
  webHook,
  createPayPalOrder,
  getOrdersByUser,
};
