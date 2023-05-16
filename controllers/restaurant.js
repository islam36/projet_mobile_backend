const Restaurant = require("../models/restaurant");
const Food = require("../models/food");

exports.getAllRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find();

    const response = restaurants.map(restaurant => {
        return {
            ...restaurant._doc,
            id: restaurant._id.toString(),
            rating: 4
        }
    });


    return res.json(response);
}


exports.getRestaurantById = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if(restaurant == null) {
        return res.status(404).end();
    }

    const response = {
        ...restaurant._doc,
        id: restaurant._id.toString(),
        rating: 4
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
            rating: 4
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
        rating: 4
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

    const response = foods.map(food => ({
            ...food._doc,
            id: food._id.toString()
        })
    );

    return res.json(response);
}