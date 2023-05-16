const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {decodeToken} = require("../util/token");

module.exports = async (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        return res.status(401).end();
    }

    const [bearer, token] = header.split(" ");

    if(bearer !== "Bearer" || !token) {
        return res.status(401).end();
    }

    const id = decodeToken(token);

    const user = await User.findById(id);

    if(user == null) {
        return res.status(401).end();
    }

    req.user = user;

    next();
}