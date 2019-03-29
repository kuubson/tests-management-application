const router = require('express').Router();
const Question = require('../models/Question');

router.post('/getTest', (req, res) => {

    const { amount, category } = req.body;
    const parsedAmount = parseInt(amount);

    Question.countDocuments((error, count) => {
        if (error) {
            res.send(error);
        }
        if (parsedAmount > count) {
            res.send({
                done: false,
                message: `There are only ${count} questions in database!`
            })
        } else {
            Question.aggregate([{ $sample: { size: parsedAmount } }, { $match: { category: category } }]).then(questions => {
                if (questions.length == 0) {
                    res.send({
                        done: false,
                        message: 'There is a lack of questions of this category in the database!'
                    });
                } else {
                    res.send({
                        done: true,
                        questions: questions
                    });
                }
            })
        }
    });

});

module.exports = router;