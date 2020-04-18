const mongoose = require('mongoose');
let review = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Movies',
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    title: {
        type: String
    }
});
let model = mongoose.model('Reviews', review);
module.exports = model;