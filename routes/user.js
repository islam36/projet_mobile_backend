const express = require("express");
const {
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;