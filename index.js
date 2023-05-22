require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");
const authRouter = require("./routes/auth");
const foodRouter = require("./routes/food");
const orderRouter = require("./routes/order");
const reviewRouter = require("./routes/review");

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
    console.log("connected successfully to the database!");
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/static", express.static(path.join(__dirname, "public")));


const errorHandler = (err, req, res, next) => {
    console.log("there was an error");

    return res.status(500).json({
        message: "there was an internal server error!"
    });
}

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/restaurants", restaurantRouter);
app.use("/foods", foodRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);

app.get("/", (req, res) => {
    res.json({
        message: "hello world"
    });
});




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`express server is running on http://localhost:${PORT}`);
});