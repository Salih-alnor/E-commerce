const mongoose = require("mongoose");
const { Schema } = mongoose;



const favoriteSchema = new Schema({

    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
    }
    
}, { timestamps: true })


module.exports = Favorite = mongoose.model("Favorite", favoriteSchema);