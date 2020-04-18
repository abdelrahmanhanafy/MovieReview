const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/[a-zA-Z0-9_-]+@[A-Z0-9]+\.[A-Z]/i, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: true
    }
});
let model = mongoose.model('Users', user);
user.plugin(uniqueValidator);
module.exports = model;