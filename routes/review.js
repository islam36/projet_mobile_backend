const router = require("express").Router();
const {
  getAllreviews,
  getReviewsOfRestaurant,
  createReview,
} = require("../controllers/review");
const checkAuth = require("../middleware/auth");

router.get("/", getAllreviews);
router.get("/:id", getReviewsOfRestaurant);
router.post("/", checkAuth, createReview);

module.exports = router;
