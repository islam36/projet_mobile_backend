const {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    getOrdersOfUser,
    handleNotification
} = require("../controllers/order");
const checkAuth = require("../middleware/auth");
const router = require("express").Router();

router.get("/", getAllOrders);
router.get("/byuser", checkAuth, getOrdersOfUser);
router.get("/:id", getOrderById);
router.post("/", checkAuth, createOrder);
router.delete("/:id", deleteOrder);
router.post("/notif", checkAuth, handleNotification)

module.exports = router;