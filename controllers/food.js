const Food = require("../models/food");
const Restaurant = require("../models/restaurant");
const FoodReview = require("../models/foodReview");

exports.getAllFoods = async (req, res) => {
    const foods = await Food.find();

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


exports.getFoodById = async (req, res) => {
    const food = await Food.findById(req.params.id);

    if(food == null) {
        return res.status(404).end();
    }

    let avg = 0;
    const reviews = await FoodReview.find({ food: food._id });

    if(reviews.length > 0) {
        reviews.forEach(review => {
            avg += review.rating;
        });

        avg = avg / reviews.length;
    }



    return res.json({
        ...food._doc,
        id: food._id.toString(),
        rating: avg
    });
}


exports.createFood = async (req, res) => {
    if(!req.body) {
        return res.status(400).end();
    }

    const restaurant = await Restaurant.findById(req.body.restaurantId);

    if(restaurant == null) {
        return res.status(400).end()
    }
    const newFood = new Food(req.body);
    await newFood.save();

    return res.json(newFood);
}


exports.deleteFood = async (req, res) => {
    const food = await Food.findByIdAndDelete(req.params.id);

    if(food == null) {
        return res.status(404).end();
    }

    return res.stats(200).end();
}