const {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    editRestaurant,
    deleteRestaurant
} = require("../controllers/restaurant");
const checkAuth = require("../middleware/auth");
const router = require("express").Router();

router.get("/", checkAuth, getAllRestaurants);
router.get("/:id", getRestaurantById);
router.post("/", createRestaurant);
router.put("/:id", editRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;