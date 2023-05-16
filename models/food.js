const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    nom: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: ""
    },
    prix: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    }
});


module.exports = mongoose.model("food", foodSchema);