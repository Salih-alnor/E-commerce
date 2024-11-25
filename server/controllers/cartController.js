const Cart = require('../models/cartModel');






const addToCart = async (req, res) => {

    const { productId, quantity, price } = req.body;

    if (!productId || !quantity || !price) {
        return res.status(400).json({ message: 'Invalid request data' });
      }

    try {

        const cart = await Cart.findOne({_id: "6741898a4eb5cfdaf31b7d3e" });

        if (!cart) {
            await Cart.create({items: [{productId, quantity}], totalPrice: quantity * price});
        } else {
            const productIndex = cart.items.findIndex(items => items.productId.toString() === productId);
            
            if (productIndex >= 0) {
                cart.items[productIndex].quantity += quantity;
                cart.totalPrice += quantity * price;
            } else {
                cart.items.push({ productId, quantity });
                cart.totalPrice += quantity * price;
            }
            await cart.save();
        }

        const newCart = await Cart.findById("6741898a4eb5cfdaf31b7d3e").populate("items.productId").populate({path: 'items.productId', populate: {
            path: 'brand',
            Model: 'Brand'
        }});
        res.status(200).json({ message: "product added to cart successfully", newCart });
    } catch (error) {
       res.status(500).json({ message: error }); 
    }
}


const getCartProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findById(id).populate("items.productId").populate({path: 'items.productId', populate: {
            path: 'brand',
            Model: 'Brand'
        }});
        if(!cart) return res.status(404).json({ message: "Cart not found" });
      res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error });  
    }
}

 
module.exports = {
    addToCart,
    getCartProducts
}