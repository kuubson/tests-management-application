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
                if (userKey === 'stk2019') {
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