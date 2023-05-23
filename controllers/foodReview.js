const FoodReview = require("../models/foodReview");
const Food = require("../models/food");
const mongoose = require("mongoose");


exports.getAllFoodReviews = async (req, res) => {
    const reviews = await FoodReview.find();

    return res.json(reviews)
}


exports.getReviewsOfFood = async (req, res) => {
    const reviews = await FoodReview.find({ food: req.params.id });

    return res.json(reviews);
}


exports.createReview = async (req, res) => {
    const food = await Food.findById(req.body.food);

    if(food == null) {
        console.log("food not found");
        return res.status(404).end();
    }

    const existingReview = await FoodReview.findOne({
        food: new mongoose.Types.ObjectId(req.body.food),
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

    const newReview = new FoodReview({
        food: food._id,
        user: req.user._id,
        rating: (req.body.rating >= 1 && req.body.rating <= 5) ? req.body.rating : 3,
        text: req.body.text
    });

    await newReview.save();

    return res.json(newReview);
}