const router = require("express").Router();
const {
    getAllContacts,
    createContact
} = require("../controllers/contact");
const checkAuth = require("../middleware/auth");

router.get("/", getAllContacts);
router.post("/", checkAuth, createContact);

module.exports = router;