const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
    const users = await User.find();

    return res.json(users);
}

exports.getUser = async (req, res) => {
    
    const user = await User.findById(req.params.id);

    if(user == null) {
        return res.status(404).end();
    }

    return res.json(user);
};


exports.createUser = async (req, res) => {
    let user = await User.findOne({ email: req.body?.email });

    if(user == null) {
        user = new User(req.body);
        await user.save();

        return res.json(user);
    }

    return res.status(400).json(null);
};


exports.editUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(user == null) {
        return res.status(404).end();
    }

    return res.json(user);
};


exports.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(user == null) {
        return res.status(404).end()
    }

    return res.status(200).end();
}