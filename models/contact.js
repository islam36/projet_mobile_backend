const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required in the contact"]
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: [true, "order is required in the contact"]
    },
    text: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("contact", contactSchema);