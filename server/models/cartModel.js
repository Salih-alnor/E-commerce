const mongoose = require('mongoose');

const {Schema} = mongoose;


const cartSchema = new Schema({
  
    items: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: [true, 'Product ID is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                min: [1, 'Quantity must be at least 1']
            }
        }
    ],
    totalPrice: {
        type: Number,
        // required: [true, 'Total price is required']
    }
})


module.exports = Cart = mongoose.model('Cart', cartSchema);