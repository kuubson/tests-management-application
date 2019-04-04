const router = require('express').Router();
const Result = require('../models/Result');

router.post('/saveResult', (req, res) => {

    const { login, category, points, totalPoints, percent, date } = req.body;

    const newResult = new Result({
        login,
        category,
        points,
        totalPoints,
        percent,
        date
    })

    newResult.save().then(res.send({
        done: true
    })).catch(() => res.send({
        done: false
    }));

})

module.exports = router;