const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', (req, res) => {
    const { login, password, type, userKey } = req.body;
    User.findOne({
        login,
    }).then(user => {
        if (user) {
            res.send({
                done: false,
                message: 'This login is already taken!'
            });
        } else {
            if (type === 'teacher') {
                if (userKey === "") {
                    res.send({
                        done: false,
                        message: 'Secret teacher key cannot be empty!'
                    });
                }
                else if (userKey === 'stk2019') {
                    newUser = new User({
                        login,
                        password,
                        type,
                    })
                    bcrypt.hash(newUser.password, 10, (error, hash) => {
                        if (error) console.log(error);
                        newUser.password = hash;
                        newUser.save().then(res.send({
                            done: true,
                            message: 'Teacher account created!'
                        })).catch(error => console.log(error));
                    })
                } else {
                    res.send({
                        done: false,
                        message: 'Cannot create teacher account, invalid secret teacher key!'
                    });
                }
            } else if (type === 'student' || type === 'blind-student') {
                if (userKey === 'stk2019') {
                    res.send({
                        done: false,
                        message: 'Cannot create teacher account with student account type chosen!'
                    });
                }
                else if (userKey !== "" && userKey !== 'stk2019') {
                    res.send({
                        done: false,
                        message: 'You cannot use secret key as student! It is forbidden'
                    });
                }
                else {
                    newUser = new User({
                        login,
                        password,
                        type,
                    })
                    bcrypt.hash(newUser.password, 10, (error, hash) => {
                        if (error) console.log(error);
                        newUser.password = hash;
                        newUser.save().then(res.send({
                            done: true,
                            message: 'Student account created!'
                        })).catch(error => console.log(error));
                    })
                }
            } else {
                newUser = new User({
                    login,
                    password,
                    type,
                })
                bcrypt.hash(newUser.password, 10, (error, hash) => {
                    if (error) console.log(error);
                    newUser.password = hash;
                    newUser.save().then(res.send({
                        done: true,
                        message: 'Student account created!'
                    })).catch(error => console.log(error));
                })
            }
        }
    })
})

module.exports = router;