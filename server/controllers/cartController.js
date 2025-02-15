const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity, statesProduct, price } = req.body;
  const { id } = req.params;

  if (!productId || !quantity || !price) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  if (!id) {
    const error = new Error("Invalid request");
    error.code = 400;
    return next(error);
  }
  const cart = await Cart.findOne({ userId: id });

  if (!cart) {
    await Cart.create({
      userId: id,
      items: [{ productId, quantity }],
      totalPrice: quantity * price,
    });
  } else {
    const productIndex = cart.items.findIndex(
      (items) => items.productId.toString() === productId
    );

    if (productIndex >= 0) {
      if (statesProduct === "increasing") {
        cart.items[productIndex].quantity += quantity;
        cart.totalPrice += quantity * price;
      } else {
        cart.items[productIndex].quantity -= quantity;
        cart.totalPrice -= quantity * price;
      }
    } else {
      cart.items.push({ productId, quantity });
      cart.totalPrice += quantity * price;
    }
    await cart.save();
  }

  const newCart = await Cart.findOne({ userId: id })
    .populate("items.productId")
    .populate({
      path: "items.productId",
      populate: {
        path: "brand",
        Model: "Brand",
      },
    });
  res
    .status(200)
    .json({ message: "product added to cart successfully", newCart });
});

const getCartProducts = asyncHandler(async (req, res, next) => {
  
  
  if (!req.user._id) {
    const err = new Error("user ID not found");
    err.code = 404;
    return next(err);
  }
  const cart = await Cart.findOne({ userId: req.user._id })
    .populate("items.productId")
    .populate({
      path: "items.productId",
      populate: {
        path: "brand",
        Model: "Brand",
      },
    });
  if (!cart) {
    const err = new Error("Cart not found");
    err.code = 404;
    return next(err);
  }

  res.status(200).json({Cart: cart});
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  
  const { productId } = req.params;
 

  if(!productId) {
    const err = new Error("Product not found");
    err.code = 404;
    return next(err);
  }

  
  if (!req.user._id) {
    const err = new Error("user ID not found");
    err.code = 404;
    return next(err);
  }

  const cart = await Cart.findOne({
    userId: req.user._id,
  }).populate("items.productId");

  const productIndex = cart.items.findIndex(
    (item) => item.productId._id.toString() === productId
  );
  if (productIndex !== -1) {
    cart.totalPrice -=
      cart.items[productIndex].quantity *
      cart.items[productIndex].productId.price;
    cart.items.splice(productIndex, 1);
    await cart.save();
    const newCart = await Cart.findOne({
      userId: req.user._id,
    }).populate("items.productId");
    return res
      .status(200)
      .json({ message: "Product deleted from cart successfully", newCart });
  } else {
    return res.status(404).json({ message: "Product not found in the cart" });
  }
});

module.exports = {
  addToCart,
  getCartProducts,
  deleteProduct,
};
