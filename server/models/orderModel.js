const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cartItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
        },
        color: String,
        size: String,
      },
    ],

    shippingAddress: [
      {
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        postalCode: {
          type: String,
        },
        country: {
          type: String,
        },
        phone: {
          type: String,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Card"],
      default: "Cash",
    },
    statusPayment: {
      type: String,
      required: true,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    statusOrder: {
      type: String,
      required: true,
      enum: [
        "pending",
        "processing",
        "completed",
        "shipping",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    
  }, {timestamps: true}
);

module.exports = Order = mongoose.model("Order", orderSchema);
