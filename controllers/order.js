const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
const mongoose = require("mongoose");
const { messaging } = require("../util/firebase");
const { ORDER_STATUS } = require("../util/constants");


exports.getAllOrders = async (req, res) => {
    const orders = await Order.find();

    const response = orders.map(order => ({
            ...order._doc,
            id: order._id.toString(),
            restaurant: order.restaurant.toString(),
            user: order.user._id.toString()
        })
    );

    return res.json(response);
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
        deliveryNotes: req.body.deliveryNotes,
        prixTotal: req.body.prixTotal
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
    const orders = await Order.find({ user: req.user._id }).sort({ date: -1 }).populate("restaurant").exec();
    const response = orders.map(order => ({
            ...order._doc,
            id: order._id.toString(),
            imageRest: order.restaurant.logo,
            restaurant: order.restaurant.nom,
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


exports.handleNotification = async (req, res) => {
    const orderId = req.body.orderId;
    const type = req.body.type;
    console.log(req.body);

    const typesReq = [
        {
            title: "Your order is being prepared",
            body: "Your order is being prepared. It may take 10 to 20 minutes"
        },
        {
            title: "Your order is picked up by delivery person",
            body: "Your order has been picked up by the delivery person."
        },
        {
            title: "Your order is on the way",
            body: "The delivery person is on his way to bring your order"
        }
    ]

    const order = await Order.findById(orderId);
    if(order == null) {
        return res.status(404).end();
    }

    if(type < 0 || type >= typesReq.length) {
        return res.status(400).end();
    }

    order.status = ORDER_STATUS[type];



    await order.save();



    const message = {
        // tokens: "f3XhN_VZSFS7t5vKKvl0ll:APA91bGHwXR60aMd1RCfLCG2JoVHz22tHpraPED8FlzZ5zIg1H0eZdqcQJ36cX4BWMu6mPjioYnTl1aQbDHwA8E8hCGvhqEHhq4MPIiIE0_r7VE6MDT-uwBj1tuPBJ39DtAZoHT4BvVf",
        tokens: req.user.tokens,
        notification: typesReq[type]
    }


    try {
        const result = await messaging().sendEachForMulticast(message)
        console.log(result);

        return res.status(200).json(typesReq[type]);

    } catch(err) {
        console.log(err);

        return res.status(500).json({
            message: "there was an internal server error"
        })
    }

}