const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required in the order"]
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: [true, "restaurant is required in the order"]
    },
    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "food",
                required: [true, "food is required in the list of items of the order"]
            },
            count: {
                type: Number,
                min: 1,
                required: true,
            }
        }
    ],
    notes: [
        {
            type: String,
        }
    ],
    deliveryAddress: {
        type: String,
        required: [true, "delivery address is required in the order"]
    },
    deliveryNotes: {
        type: String,
        default: ""
    }

});


module.exports = mongoose.model("order", orderSchema);