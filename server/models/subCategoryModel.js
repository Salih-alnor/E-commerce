const mongoose = require("mongoose");

const { Schema} = mongoose;

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "SubCategory required"],
        unique: [true, "SubCategory must be unique"],
        maxlength: [30, 'too long SubCategory name'],
        minlength: [2, 'too short SubCategory name']
    },

    slug: {
        type: String,
        unique: [true, "SubCategory slug must be unique"],
        lowercase: true
    },

    mainCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "SubCategory must be belong to mainCategory"],
    },

    image: {
        type: String,
        required: [true, "SubCategory must have an image"]
    }
}, {timestamps: true})

module.exports = mongoose.model('SubCategory', subCategorySchema)