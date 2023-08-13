const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
    },
    notes: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Contact", contactSchema);
