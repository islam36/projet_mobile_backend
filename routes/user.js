const express = require("express");
const {
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser,
    getProfile
} = require("../controllers/user");
const checkAuth = require("../middleware/auth");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile", checkAuth, getProfile);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/", checkAuth, editUser);
router.delete("/:id", deleteUser);

module.exports = router;