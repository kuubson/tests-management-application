const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    accountCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
})

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;