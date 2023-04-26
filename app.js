const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.all("/", (req, res) => {
    res.json({
        message: "hello world"
    });
});


module.exports = app;