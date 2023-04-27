const express = require("express");
const {
    getUser,
    createUser,
    editUser,
    deleteUser
} = require("../controllers/user");
const router = express.Router();

router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;