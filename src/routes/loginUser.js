const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

router.post('/login', (req, res) => {

    const { login, password } = req.body;
    User.findOne({
        login
    }).then(user => {
        if (!user) {
            res.send({
                done: false,
                message: 'User not found!'
            });
        } else {
            bcrypt.compare(password, user.password, (err, correctPassword) => {
                if (err) {
                    res.send({
                        done: false,
                        message: 'Error occured!'
                    });
                }
                if (correctPassword) {
                    const payload = { login }
                    const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
                    res.send({
                        done: true,
                        message: 'Logged in',
                        token: token
                    });
                } else {
                    res.send({
                        done: false,
                        message: 'Bad password'
                    });
                }
            });
        }
    })

})

module.exports = router;