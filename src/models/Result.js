const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    },
    percent: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    }
})

const Result = mongoose.model('Result', ResultSchema, 'results')

module.exports = Result