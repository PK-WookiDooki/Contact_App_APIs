const express = require("express");
const {
    createNewContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
} = require("../controllers/contactsController");

const router = express.Router();

router.route("/").get(getAllContacts).post(createNewContact);
router
    .route("/:id")
    .get(getContactById)
    .put(updateContact)
    .delete(deleteContact);

module.exports = router;
