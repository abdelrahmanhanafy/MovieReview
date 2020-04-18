const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let movie = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
    actors: [
        {
            type: String
        }],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ]
});
let model = mongoose.model('Movies', movie);
movie.plugin(uniqueValidator);
module.exports = model;