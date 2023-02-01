const mongoose = require("mongoose");
const shortId = require('shortid');

const shortUlrSchema = mongoose.Schema({
    fullurl: {
        type: String,
        required: true,
    },
    shorturl: {
        type: String,
        required: true,
        default: shortId.generate,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    }

});

module.exports = mongoose.model('ShortUrl', shortUlrSchema);