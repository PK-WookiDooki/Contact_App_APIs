import express from "express";
import cors from "cors";
import sql from "mysql2";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { contactsRouter } from "./routes/contactsRoutes.js";
const app = express();

config();

//middleware
app.use(express.urlencoded({ extends: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 7987;
export const db = sql.createConnection({
    host: "127.0.0.1",
    user: "psk",
    password: process.env.USER_PASSWORD,
    database: "nodejs_react",
});

app.use("/contacts", contactsRouter);

app.listen(port, () => {
    if (db) {
        console.log("Connected to database.");
    } else {
        console.log("Error connecting to the database.");
    }
});
