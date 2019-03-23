const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

router.post('/register', (req, res) => {
    const { login, password, teacherKey } = req.body;
    User.findOne({
        login
    }).then(user => {
        if (user) {
            res.send({
                done: false,
                msg: 'This login is already taken'
            });
        } else {
            let teacherAuthWarning;
            let teacherAuthSuccess;
            const newUser = new User({
                login,
                password,
            })
            if (teacherKey == 'stk2019') {
                newUser.role = 'teacher';
                teacherAuthSuccess = 'Teacher key is right! Created teacher account!';
                teacherAuthWarning = '';
            } else if (teacherKey != "") {
                teacherAuthWarning = 'Bad teacher key! Created standard student account!';
                teacherAuthSuccess = '';
            } else {
                teacherAuthSuccess = '';
                teacherAuthWarning = '';
            }
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save().then(res.send({
                    done: true,
                    msg: 'Account created!',
                    teacherAuthWarning: teacherAuthWarning,
                    teacherAuthSuccess: teacherAuthSuccess
                })).catch(err => console.log(err));
            }))
        }
    })
});

router.post('/login', (req, res) => {
    const { login, password } = req.body;
    User.findOne({
        login
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
                    const payload = { login }
                    const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
                    res.send({
                        login: user.login,
                        role: user.role,
                        token: token,
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

router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({
        login: req.user.login,
        role: req.user.role
    });
});

module.exports = router;