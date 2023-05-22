const {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder
} = require("../controllers/order");
const checkAuth = require("../middleware/auth");
const router = require("express").Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", checkAuth, createOrder);
router.delete("/:id", deleteOrder);

module.exports = router;