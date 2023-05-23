const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const Food = require("../models/food");
const FoodReview = require("../models/foodReview");
const mongoose = require("mongoose");

exports.getAllRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find();

    const response = restaurants.map(async (restaurant) => {
        let avg = 0;
        const reviews = await Review.find({ restaurant: restaurant._id });

        if(reviews.length > 0) {
            reviews.forEach(review => {
                avg += review.rating;
            });
    
            avg = avg / reviews.length;
        }

        return {
            ...restaurant._doc,
            id: restaurant._id.toString(),
            rating: parseFloat(avg)
        }
    });

    const result = await Promise.all(response)

    return res.json(result);
}


exports.getRestaurantById = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if(restaurant == null) {
        return res.status(404).end();
    }

    let avg = 0;
    const reviews = await Review.find({ restaurant: new mongoose.Types.ObjectId(req.params.id) });

    if(reviews.length > 0) {
        reviews.forEach(review => {
            avg += review.rating;
        });

        avg = avg / reviews.length;
    }

    const response = {
        ...restaurant._doc,
        id: restaurant._id.toString(),
        rating: parseFloat(avg)
    };

    return res.json(response);
}


exports.createRestaurant = async (req, res) => {
    const existingRestaurant = await Restaurant.find({ nom: req.body?.nom });

    if(existingRestaurant == null || existingRestaurant.length === 0) {
        console.log("here")
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
    
        return res.json({
            ...restaurant._doc,
            id: restaurant._id.toString(),
            rating: 0
        });
    }

    return res.status(400).end();

}


exports.editRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(restaurant == null) {
        return res.status(404).end();
    }

    return res.json({
        ...restaurant._doc,
        id: restaurant._id.toString(),
    });
}


exports.deleteRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if(restaurant == null) {
        return res.status(404).end();
    }

    return res.status(200).end();
}



exports.getAllFoodsOfRestaurant = async (req, res) => {
    const foods = await Food.find({ restaurantId: req.params.id });

    const response = foods.map(async (food) => {
        let avg = 0;
        const reviews = await FoodReview.find({ food: food._id });

        if(reviews.length > 0) {
            reviews.forEach(review => {
                avg += review.rating;
            });

            avg = avg / reviews.length;
        }

        return {
            ...food._doc,
            id: food._id.toString(),
            rating: avg
        }
    });

    const result = await Promise.all(response);

    return res.json(result);
}