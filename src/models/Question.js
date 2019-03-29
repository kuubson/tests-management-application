const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    answerA: {
        type: String,
        required: true
    },
    answerB: {
        type: String,
        required: true
    },
    answerC: {
        type: String,
        required: true
    },
    answerD: {
        type: String,
        required: true
    },
    properAnswer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
    }
})

const Question = mongoose.model('Question', QuestionSchema, 'questions');

module.exports = Question;