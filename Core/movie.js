const mongoose = require('mongoose');
let movie = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    actors: [{
        type: String
    }],
    reviews: [{
        type: String
    }]
});
let model = mongoose.model('Movies', movie);
module.exports = model;