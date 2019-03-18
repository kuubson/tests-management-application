const router = require('express').Router();
const Question = require('../models/Question');

router.post('/getTest', (req, res) => {
    const { numberOfQuestions } = req.body;
    const limit = parseInt(numberOfQuestions);
    Question.aggregate([{ $sample: { size: limit } }]).then(questions => {
        res.send(questions)
    })
});

module.exports = router;