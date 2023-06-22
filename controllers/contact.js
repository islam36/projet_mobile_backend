const Contact = require("../models/contact");
const mongoose = require("mongoose");
const Order = require("../models/order");
const { ORDER_STATUS } = require("../util/constants");

exports.getAllContacts = async (req, res) => {
    const contacts = await Contact.find();

    return res.json(contacts);
}

exports.createContact = async (req, res) => {
    if(!req.body.order) {
        return res.status(400).end();
    }

    const existingOrder = await Order.findById(req.body.order);

    if(existingOrder == null) {
        return res.status(400).end();
    }

    if(existingOrder.status == ORDER_STATUS[2]) {
        return res.status(400).end();
    }

    const contact = new Contact({
        user: req.user._id,
        order: existingOrder._id,
        text: req.body.text
    });

    contact.save();

    return res.json(contact);
}