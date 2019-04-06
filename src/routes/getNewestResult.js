const router = require('express').Router();
const Result = require('../models/Result');

router.post('/getNewestResult', (req, res) => {

    const { login } = req.body;

    Result.findOne({
        login
    }, null, { sort: { _id: -1 } }, (error, result) => {
        if (error) {
            res.send('Error occured!');
        }
        if (result) {
            res.send({
                login: result.login,
                category: result.category,
                points: result.points,
                totalPoints: result.totalPoints,
                percent: result.percent,
                date: result.date
            })
        } else {
            res.send('This student do not have any solved tests!');
        }
    })

})

module.exports = router;