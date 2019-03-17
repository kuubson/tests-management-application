const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/register', (req, res) => {
    const { login, password } = req.body;
    User.findOne({
        login: login
    }).then(user => {
        if (user) {
            res.send({
                done: false,
                msg: 'This login is already taken'
            });
        } else {
            const newUser = new User({
                login,
                password
            })
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save().then(res.send({
                    done: true,
                    msg: 'Account created!'
                })).catch(err => console.log(err));
            }))
        }
    })
});

router.post('/login', (req, res) => {
    const { login, password } = req.body;
    User.findOne({
        login: login
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, correctPassword) => {
                if (err) {
                    res.send({
                        done: false,
                        msg: 'Error occured!'
                    });
                }
                if (correctPassword) {
                    res.send({
                        done: true,
                        msg: 'Logged in'
                    });
                } else {
                    res.send({
                        done: false,
                        msg: 'Bad password'
                    });
                }
            });
        } else {
            res.send({
                done: false,
                msg: 'User not found!'
            });
        }
    })
})

module.exports = router;