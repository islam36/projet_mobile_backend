const { getAllFoods, createFood, getFoodById, deleteFood } = require("../controllers/food");
const router = require("express").Router();

router.get("/", getAllFoods);
router.post("/", createFood);
router.get("/:id", getFoodById);
router.delete("/", deleteFood);

module.exports = router;