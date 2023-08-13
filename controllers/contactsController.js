const Contact = require("../models/Contact");

const getAllContacts = async (req, res) => {
    const contacts = await Contact.find().lean();
    if (!contacts?.length)
        return res
            .status(400)
            .json({ success: false, message: "No contacts found!" });

    return res.json({ success: true, data: contacts });
};

//create new contact
const createNewContact = async (req, res) => {
    try {
        const { name, phone, avatar, notes } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and Phone are required to create new contact!",
            });
        }

        const duplicate = await Contact.findOne({ phone }).lean().exec();

        if (duplicate)
            return res.status(409).json({
                success: false,
                message: `Contact with phone number ${phone} already existed!`,
            });

        const contactObj = { name, phone, avatar, notes };
        const contact = await Contact.create(contactObj);

        if (!contact)
            return res
                .status(400)
                .json({ success: false, message: "Invalid data received!" });

        return res.json({ success: true, data: contact });
    } catch (error) {
        throw new Error(error);
    }
};

//update contact
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, avatar, notes, favorite } = req.body;

        if (!id)
            return res.status(401).json({
                success: false,
                message: "ID is required to update the blog!",
            });

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and Phone are required to create new contact!",
            });
        }

        const contact = await Contact.findById(id).exec();

        if (!contact)
            return res.status(404).json({
                success: false,
                message: `Contact with id ${id} not found!`,
            });

        contact.name = name;
        contact.phone = phone;
        contact.avatar = avatar;
        contact.notes = notes;
        contact.favorite = favorite;

        //save updated contact in db
        const updatedContact = await contact.save();
        res.json({ success: true, data: updateContact });
    } catch (error) {
        throw new Error(error);
    }
};

//delete contact
const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({
            success: false,
            message: "ID is required to delete the contact!",
        });

    const contact = await Contact.findById(id).exec();
    if (!contact)
        return res.status(404).json({
            success: false,
            message: `Contact with id ${id} not found!`,
        });

    const result = await contact.deleteOne();
    return res.json({
        success: true,
        message: `Contact with id ${id} has been deleted!`,
    });
};

//get single contact
const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res
                .status(404)
                .json({ success: false, message: "ID is required!" });

        const contact = await Contact.findById(id).exec();
        if (!contact)
            return res.status(404).json({
                success: false,
                message: `Contact with id ${id} not found!`,
            });

        return res.json({ success: true, data: contact });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createNewContact,
    updateContact,
    deleteContact,
};
