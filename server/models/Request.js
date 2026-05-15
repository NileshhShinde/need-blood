const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

    patientName: {
        type: String,
        required: true
    },

    bloodGroup: {
        type: String,
        required: true
    },

    hospital: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Request", requestSchema);