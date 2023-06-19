const User = require("../models/user");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../util/constants");

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
        const hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        req.body.password = hash;

        user = new User(req.body);
        await user.save();

        

        return res.status(200).json({
            message: "user created successfully"
        })
    }

    return res.status(400).json({
        message: "this email is already used"
    });
};


exports.editUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

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


exports.getProfile = async (req, res) => {
    return res.json({
        ...req.user._doc,
        id: req.user._id.toString()
    })
}