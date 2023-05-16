const Food = require("../models/food");
const Restaurant = require("../models/restaurant");

exports.getAllFoods = async (req, res) => {
    const foods = await Food.find();

    const response = foods.map(food => ({
            ...food._doc,
            id: food._id.toString()
        })
    )

    return res.json(response);
}


exports.getFoodById = async (req, res) => {
    const food = await Food.findById(req.params.id);

    if(food == null) {
        return res.status(404).end();
    }

    return res.json({
        ...food._doc,
        id: food._id.toString()
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