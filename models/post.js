const mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    details: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Post", PostSchema);

