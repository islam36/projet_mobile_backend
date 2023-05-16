const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../util/token");


exports.login = async (req, res) => {
    if(!req.body || !req.body.email || !req.body.password) {
        return res.status(400).end()
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if(existingUser == null) {
        return res.status(404).end();
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, existingUser.password);

    if(passwordMatch) {
        const token = createToken(existingUser._id.toString());

        return res.json({
            token
        });
    }

    return res.status(400).end();
}