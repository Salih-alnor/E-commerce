const mongoose = require("mongoose");

const { Schema} = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category required"],
        unique: [true, "Category must be unique"],
        maxlength: [30, 'too long category name'],
        minlength: [2, 'too short category name']
    
    },

    slug: {
        type: String,
        lowercase: true,
    },

    image: {
        type: String
    }
   
}, {
    timestamps: true
});

module.exports = mongoose.model("Category", categorySchema)
 

