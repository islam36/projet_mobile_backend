const { getAllFoodReviews, getReviewsOfFood, createReview } = require("../controllers/foodReview");
const router = require("express").Router();
const checkAuth = require("../middleware/auth");

router.get("/", getAllFoodReviews);
router.get("/:id", getReviewsOfFood);
router.post("/", checkAuth, createReview);

module.exports = router;