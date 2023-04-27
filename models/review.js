const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required in the review"]
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: [true, "restaurant is required in the review"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "rating number is required in the review"]
    },
    text: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

//make the tuple (user, restaurant) unique
//in other words, only one review by a user for the same restaurant
reviewSchema.index({ user: 1, restaurant: 1 }, { unique: true });

module.exports = mongoose.model("review", reviewSchema);