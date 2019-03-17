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
    role: {
        type: String,
        required: true,
        minlength: 7,
        default: 'student'
    },
    accountCreated: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;