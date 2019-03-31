const router = require('express').Router();
const Result = require('../models/Result');

router.get('/getResult', (req, res) => {

    const { login } = req.body;

    Result.find({
        login
    }).then(results => {
        if (results) {
            res.send(results);
        } else {
            res.send('This student do not have any solved tests!');
        }
    })

})

module.exports = router;