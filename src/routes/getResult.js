const router = require('express').Router();
const Result = require('../models/Result');
const User = require('../models/User');

router.post('/getResult', (req, res) => {

    const { login } = req.body;

    User.findOne({
        login
    }).then(user => {
        if (user) {
            Result.find({
                login
            }).then(results => {
                if (results != "") {
                    res.send({
                        done: true,
                        results: results
                    });
                } else {
                    res.send({
                        done: false,
                        message: 'This student do not have any solved tests!'
                    });
                }
            })
        } else {
            res.send({
                done: false,
                message: 'There is no such a student!'
            })
        }
    })

})

module.exports = router;