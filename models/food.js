const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "food name is required"]
    },
    type: {
        type: String,
        enum: ["meal", "drink", "dessert"]
    },
    price: {
        type: Number,
        min: 1,
        required: [true, "food price is required"]
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: [true, "restaurantId is required"]
    },
    photo: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model("food", foodSchema);