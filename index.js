require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
    console.log("connected successfully to the database!");
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.all("/", (req, res) => {
    res.json({
        message: "hello world"
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`express server is running on http://localhost:${PORT}`);
});