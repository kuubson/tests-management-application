const router = require('express').Router();
const Question = require('../models/Question');

router.post('/getTest', (req, res) => {

    const { amount, category } = req.body;
    const parsedAmount = parseInt(amount);

    Question.find({
        category
    }, null, { limit: parsedAmount }, (error, questions) => {
        if (error) {
            res.send(error);
        }
        if (questions.length == 0) {
            res.send({
                done: false,
                message: 'There is a lack of questions of this category in the database!'
            });
        }
        else if (parsedAmount > questions.length) {
            res.send({
                done: false,
                message: `There are ${questions.length} question/s of this category in the database!`
            });
        } else {
            res.send({
                done: true,
                questions: questions
            });
        }
    });
});

module.exports = router;