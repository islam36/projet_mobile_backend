const mongoose = require("mongoose");
const { PHONR_REGEX, EMAIL_REGEX } = require("../util/constants");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "restaurant name is required"],
        unique: true,
    },
    logo: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        required: [true, "restaurant address is required"]
    },
    logitude: {
        type: Number,
        required: [true, "restaurant logitude is required"]
    },
    latitude: {
        type: Number,
        required: [true, "restaurant latitude is required"]
    },
    cuisineType: {
        type: String,
        required: [true, "restaurant cuisine type is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    numberOfReviews: {
        type: Number,
        min: 0,
    },
    phone: {
        type: String,
        match: PHONR_REGEX,
        unique: true,
    },
    email: {
        type: String,
        match: EMAIL_REGEX,
        unique: true
    },
    facebook: {
        type: String,
        unique: true,
    },
    instagram: {
        type: String,
        unique: true,
    },
    twitter: {
        type: String,
        unique: true,
    },
    website: {
        type: String,
        unique: true,
    },
    deliveryFee: {
        type: Number,
        min: 1,
        required: [true, "restaurant delivery fee is required "]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("restaurant", restaurantSchema);