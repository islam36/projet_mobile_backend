const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
const mongoose = require("mongoose");


exports.getAllOrders = async (req, res) => {
    const orders = await Order.find();

    const response = orders.map(order => ({
            ...order._doc,
            id: order._id.toString(),
            restaurant: order.restaurant.toString(),
            user: order.user._id.toString()
        })
    );

    return res.json(reponse);
}


exports.createOrder = async (req, res) => {
    if(!req.body || !req.body.restaurant) {
        console.log("no body or no restaurant")
        return res.status(400).end();
    }

    //if restaurant doesn't exist
    const restaurant = await Restaurant.findById(req.body.restaurant);
    if(restaurant == null) {
        return res.status(400).end();
    }

    //if list of food is empty
    if(!req.body.items || req.body.items.length === 0) {
        return res.status(400).end();
    }

    const foods = await Food.find({
        _id: {
            $in: req.body.items.map(item => new mongoose.Types.ObjectId(item.food) )
        }
    });

    //if some foods are not valid
    if(foods.length !== req.body.items.length) {
        return res.status(400).end();
    }

    console.log("req body:", req.body);
    const newOrder = new Order({
        user: req.user._id,
        restaurant: restaurant._id,
        items: req.body.items,
        notes: req.body.notes,
        deliveryAddress: req.body.deliveryAddress,
        deliveryNotes: req.body.deliveryNotes
    });

    await newOrder.save();

    return res.json({
        ...newOrder._doc,
        restaurant: newOrder.restaurant.toString(),
        id: newOrder._id.toString(),
        user: newOrder.user.toString()
    });
}


exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order == null) {
        return res.status(404).end();
    }

    return res.json({
        ...order._doc,
        id: order._id.toString(),
        restaurant: order.restaurant.toString(),
        user: order.user.toString()
    });
}


exports.getOrdersOfUser = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ date: -1 });
    const response = orders.map(order => ({
            ...order._doc,
            id: order._id.toString(),
            restaurant: order.restaurant.toString(),
            user: order.user.toString()
        })
    );

    return res.json(response);
}


exports.deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if(order == null) {
        return res.status(404).end();
    }

    return res.status(200).end();
}