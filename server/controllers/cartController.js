const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const id = "6741898a4eb5cfdaf31b7d3e";
  if (!productId || !quantity || !price) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
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
        cart.items[productIndex].quantity += quantity;
        cart.totalPrice += quantity * price;
      } else {
        cart.items.push({ productId, quantity });
        cart.totalPrice += quantity * price;
      }
      await cart.save();
    }

    const newCart = await Cart.findOne({userId: id})
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
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCartProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({userId: id})
      .populate("items.productId")
      .populate({
        path: "items.productId",
        populate: {
          path: "brand",
          Model: "Brand",
        },
      });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({userId: "6741898a4eb5cfdaf31b7d3e"}).populate(
      "items.productId"
    );

    const productIndex = cart.items.findIndex(
      (item) => item.productId._id.toString() === productId
    );
    if (productIndex !== -1) {
      cart.totalPrice -=
        cart.items[productIndex].quantity *
        cart.items[productIndex].productId.price;
      cart.items.splice(productIndex, 1);
      await cart.save();
      const newCart = await Cart.findOne({userId: "6741898a4eb5cfdaf31b7d3e"}).populate(
        "items.productId"
      );
      return res
        .status(200)
        .json({ message: "Product deleted from cart successfully", newCart });
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  addToCart,
  getCartProducts,
  deleteProduct,
};
