require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

connectDB();

//middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use("/contacts", require("./routes/contactsRoutes"));

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => {
        console.log(
            `Connected to database & Server is running on port ${PORT}`
        );
    });
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});
