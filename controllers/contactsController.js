import { db } from "../index.js";

export const getAllContacts = async (req, res) => {
    try {
        const q = "SELECT * FROM contacts ORDER BY id DESC ";
        db.query(q, (err, data) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: "Fail to get contacts from database!",
                });

            return res.json({ success: true, data: data });
        });
    } catch (error) {
        throw new Error(error);
    }
};

//create new contact
export const createNewContact = async (req, res) => {
    try {
        const { name, phone, avatar, notes } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and Phone are required to create new contact!",
            });
        }

        const findPhoneQ = "SELECT * FROM contacts WHERE `phone` = ?";
        const q =
            "INSERT INTO contacts (`name`, `phone`, `avatar`, `notes`) VALUES ( ? );";

        const contact = [name, phone, avatar, notes];
        db.query(findPhoneQ, [phone], (err, data) => {
            if (err) return res.json({ success: false, message: err });

            if (data.length > 0)
                return res.json({
                    success: false,
                    message: `Contact with phone number (${phone}) already existed!`,
                });
            db.query(q, [contact], (err, data) => {
                if (err)
                    return res
                        .status(400)
                        .json({ success: false, message: err });

                return res.json({ success: true, data: data });
            });
        });
    } catch (error) {
        throw new Error(error);
    }
};

//update contact
export const updateContact = async (req, res) => {
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

        const findBlogQ = "SELECT * FROM blogs WHERE id = ?";

        db.query(findBlogQ, [id], (err, data) => {
            if (data.length < 0) {
                return res.status(404).json({
                    success: false,
                    message: `Blog with ID ${id} not found!`,
                });
            } else {
                const q =
                    "UPDATE contacts SET `name` = ? , `phone` = ?, `avatar` = ?, `notes` = ?, `favorite` = ? WHERE id = ?";

                db.query(
                    q,
                    [name, phone, avatar, notes, favorite, id],
                    (err, data) => {
                        if (err) throw new Error(err);
                        return res.json({ success: true, data: data });
                    }
                );
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

//delete contact
export const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({
            success: false,
            message: "ID is required to delete the contact!",
        });

    const q = "DELETE FROM contacts WHERE id = ? ";
    db.query(q, [id], (err, data) => {
        if (err) return res.json({ success: false, message: err });
        return res.json({
            success: true,
            message: `Contact ID ${id} has been deleted!`,
        });
    });
};

//handling favorite/unfavorite
export const handleFavorite = async (req, res) => {
    const { id } = req.params;

    const { favorite } = req.body;

    if (!id)
        return res.status(400).json({
            success: false,
            message: "ID is required to update favorite!",
        });

    const findContactQ = "SELECT * from contacts WHERE id = ?";
    const updateQ = "UPDATE contacts SET `favorite` = ? WHERE id = ?";

    db.query(findContactQ, [id], (err, data) => {
        if (err) return res.json({ success: false, message: err });

        db.query(updateQ, [favorite, id], (err, data) => {
            if (err) return res.json({ success: false, message: err });

            return res.json({ success: true, data: data });
        });
    });
};

//get single contact
export const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res
                .status(404)
                .json({ success: false, message: "ID is required!" });

        const q = "SELECT * FROM contacts WHERE id = ?";

        db.query(q, id, (err, data) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    message: err,
                });

            return res.json({ success: true, data: data[0] });
        });
    } catch (error) {
        throw new Error(error);
    }
};
