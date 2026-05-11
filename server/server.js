require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Donor = require("./models/Donor");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running");
});

app.post("/donor", async(req, res) => {

    try {

        const donor = new Donor(req.body);

        await donor.save();

        res.json({
            message: "Donor Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});