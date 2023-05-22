const Review = require("../models/review");
const Restaurant = require("../models/restaurant");
const mongoose = require("mongoose");

exports.getAllreviews = async (req, res) => {
    const reviews = await Review.find();

    return res.json(reviews);
}


exports.getReviewsOfRestaurant = async (req, res) => {
    const reviews = await Review.find({ restaurant: req.params.id });

    return res.json(reviews);
}


exports.createReview = async (req, res) => {
    const restaurant = await Restaurant.findById(req.body.restaurant);

    if(restaurant == null) {
        return res.status(404).end();
    }

    const existingReview = await Review.findOne({
        restaurant: new mongoose.Types.ObjectId(req.body.restaurant),
        user: req.user._id
    });


    if(existingReview != null) {
        if(req.body.rating >= 1 && req.body.rating <= 5) {
            existingReview.rating = req.body.rating;
        }

        existingReview.text = req.body.text;
        await existingReview.save();
        return res.json(existingReview);
    }

    const newReview = new Review({
        restaurant: new mongoose.Types.ObjectId(req.body.restaurant),
        user: req.user._id,
        rating: (req.body.rating >= 1 && req.body.rating <= 5) ? req.body.rating : 3,
        text: req.body.text
    });

    await newReview.save();

    return res.json(newReview);
}