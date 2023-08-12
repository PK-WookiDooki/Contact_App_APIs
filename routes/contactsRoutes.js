import express from "express";
import {
    createNewContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
} from "../controllers/contactsController.js";

const router = express.Router();

router.route("/").get(getAllContacts).post(createNewContact);
router
    .route("/:id")
    .get(getContactById)
    .put(updateContact)
    .delete(deleteContact);

export const contactsRouter = router;
