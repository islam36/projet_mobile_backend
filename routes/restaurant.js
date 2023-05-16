const {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    editRestaurant,
    deleteRestaurant,
    getAllFoodsOfRestaurant
} = require("../controllers/restaurant");

const router = require("express").Router();

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.get("/:id/foods", getAllFoodsOfRestaurant);
router.post("/", createRestaurant);
router.put("/:id", editRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;