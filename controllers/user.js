const User = require("../models/user");

exports.getUser = (req, res) => {
    const user = User.findById(req.params.id);

    if(user == null) {
        return res.status(404).json({
            message: "user not found"
        });
    }

    return res.json({
        user,
        message: "user found"
    });
};


exports.createUser = (req, res) => {
    let user = null;

    try {
        user = User.create(req.body);
    } catch(err) {
        throw new Error(err.message);
    }

    return res.status(201).json({
        user,
        message: "user created successfully"
    });
};


exports.editUser = (req, res) => {
    const user = User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(user == null) {
        return res.status(404).json({
            message: "user not found"
        });
    }

    return res.json({
        user,
        message: "user updated successfully"
    });
};


exports.deleteUser = (req, res) => {
    const user = User.findByIdAndDelete(req.params.id);

    if(user == null) {
        return res.status(404).json({
            message: "user not found"
        });
    }

    return res.json({
        message: "user deleted successfully"
    });
}