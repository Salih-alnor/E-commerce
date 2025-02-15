const stripe = require("stripe")(
  "sk_test_51Qr4PaKg2ri1qMe4DKAB2gQqERZ8AZpfuaW0FqLVnibCumuPbXrqWjvUiF7GGmHA9rhfFeuMSEGNy1sZJ7SL45e6003cCxCmBQ"
);
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const paypal = require("@paypal/checkout-server-sdk");

/*
  @desc Create cash order
  @route POST /api/order/cash-order
  @access Private
*/

const createCashOrder = asyncHandler(async (req, res, next) => {
  // 1- get cart from cartItems
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  // 2- create cash order
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.items,
    totalPrice: cart.totalPrice,
  });

  // 3- clear cart items after order has been created
  await Cart.findByIdAndDelete(cartId);

  res
    .status(201)
    .json({ status: "success", message: "Order created successfully", order });
});

/*
  @desc Create checkout order
  @route POST /api/order/checkout-session
  @access Private[user]
*/
const createCheckoutSessions = asyncHandler(async (req, res, next) => {
  // 1- get cart from cartItems
  const cartId = req.params.cartId;
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

      // 2- create online transaction order
      const order = await Order.create({
        user: userId,
        paymentMethod: "card",
        cartItems: cart.items,
        totalPrice: cart.totalPrice,
      });

      // 3- clear cart items after order has been created
      await Cart.findByIdAndDelete(cartId);

      res.status(201).json({
        status: "success",
        message: "Order created successfully",
        order,
        cart
      });
      console.log(order);
      

  }

  // res.json({ received: true });
};


const environment = new paypal.core.SandboxEnvironment(
  "AUnMvQNid-EeTj0CwgbM-DCxzrxJCqUrsDQCUw8wkcouAstdThbtjgKw407OSkU8KiL4CYOUkO0amgF9",
  "EDK3CqG8fKy3p51TngY40x2ABZJLv_vhLePQY23y80-hVYYNUISPZ-i36zghn59GJsWC5ss2aumd0x9c"
);

const client = new paypal.core.PayPalHttpClient(environment);


const createPayPalOrder = asyncHandler(async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "10.00", // المبلغ
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = { createCashOrder, createCheckoutSessions, webHook, createPayPalOrder };
