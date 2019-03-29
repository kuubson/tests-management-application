const router = require('express').Router();
const Question = require('../models/Question');

router.post('/saveQuestion', (req, res) => {
    const { body, answerA, answerB, answerC, answerD, properAnswer, category, imageUrl } = req.body;
    Question.findOne({
        body
    }).then(question => {
        if (question) {
            res.send({
                done: false,
                message: 'This question is already in the database!'
            });
        } else {
            newQuestion = new Question({
                body,
                answerA,
                answerB,
                answerC,
                answerD,
                properAnswer,
                category,
                imageUrl
            })
            newQuestion.save().then(res.send({
                done: true,
                message: 'Question was added to the database!'
            })).catch(error => console.log(error));
        }
    })
})

module.exports = router;