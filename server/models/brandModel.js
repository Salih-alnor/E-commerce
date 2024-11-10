const mongoose = require("mongoose");

const { Schema } = mongoose;

const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, "Brand required"],
        unique: [true, "Brand must be unique"],
        maxlength: [20, 'too long Brand name'],
        minlength: [2, 'too short Brand name']
    },

    slug: {
        type: String,
        lowercase: true
    },

    mainCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Brand must be belong to mainCategory"],
    },

    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
        required: [true, "Brand must be belong to subCategory"],
    },

    image: {
        type: String
    }
}, {timestamps: true})

module.exports = Brand = mongoose.model('brand', brandSchema)