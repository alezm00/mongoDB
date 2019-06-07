const mongoose = require("mongoose");


const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Sub',subSchema);