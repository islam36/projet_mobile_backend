const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const expiresIn = "30d"

exports.createToken = (id) => {
    const token = jwt.sign(id, JWT_SECRET);

    return token;
}


exports.decodeToken = (token) => {
    const id = jwt.verify(token, JWT_SECRET);
    return id;
}