const mongoose = require("mongoose");
const { PHONR_REGEX, EMAIL_REGEX } = require("../util/constants");

const restaurantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: "" 
    },
    cuisine_type: {
        type: String
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    email: {
        type: String,
        match: EMAIL_REGEX
    },
    phone: {
        type: String,
        match: PHONR_REGEX
    },
    fb: {
        type: String
    },
    instagram: {
        type: String
    },
    adress: {
        type: String
    }
});

module.exports = mongoose.model("restaurant", restaurantSchema);