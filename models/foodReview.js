const mongoose = require("mongoose");

const foodReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
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
    }
});

foodReviewSchema.index({ user: 1, food: 1 }, { unique: true });

module.exports = mongoose.model("foodReview", foodReviewSchema);