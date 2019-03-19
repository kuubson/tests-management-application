const router = require('express').Router();
const Question = require('../models/Question');

router.post('/getTest', (req, res) => {
    const { numberOfQuestions } = req.body;
    const limit = parseInt(numberOfQuestions);
    Question.countDocuments((error, count) => {
        if (error) {
            res.send(error);
        }
        if (limit > count) {
            res.send({
                done: false,
                msg: `There is only ${count} questions in database!`
            })
        } else {
            Question.aggregate([{ $sample: { size: limit } }]).then(questions => {
                res.send({
                    questions,
                    done: true
                });
            })
        }
    });

});

module.exports = router;