const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Product required"],
        maxlength: [200, 'too long product name'],
        minlength: [2, 'too short product name']
    
    },

    slug: {
        type: String,
        lowercase: true,
    },

    price: {
        type: Number,
        trim: true,
        required: [true, "Price is required"]
    },
    
    isFavorite: {
        type: Boolean,
        default: false
    },

    quantity: {
        type: Number,
        trim: true,
        required: [true, "Quantity is required"]
    },

    images:[String],

    colors: [
        {
            color: { type: String }, // اللون
            stock: { type: Number }, // عدد القطع المتاحة لهذا اللون
        },
      ],
    

    sizes: [
        {
          size: { type: String }, // الحجم
          stock: { type: Number }, // عدد القطع المتاحة لهذا الحجم
        },
      ],

    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [5000, 'too long product description'],
        minlength: [50, 'too short product description']
    }, 

    mainCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Product must be belong to mainCategory"],
    },

    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        required: [true, "Product must be belong to subCategory"],
    },

    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
        required: [true, "Product must be belong to brand"],
    },
   
}, {
    timestamps: true
});

module.exports = Product = mongoose.model("Product", productSchema)
 

