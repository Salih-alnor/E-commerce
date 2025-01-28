const mongoose = require("mongoose");


const { Schema} = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name should be at least 3 characters long"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, 'Email must be unique'],
    
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password should be at least 8 characters long"]
    },

    phone: {
        type: String
    },

    profileImage: {
        type: String,
        default: 'profile.png',
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    favoritesList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]


}, {timeseries: true});


module.exports = mongoose.model('User', userSchema);