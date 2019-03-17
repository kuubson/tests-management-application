const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
    const { login, password } = req.body;
    User.findOne({
        login: login
    }).then(user => {
        if (user) {
            res.send(false);
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
                newUser.save().then(res.send(true)).catch(err => console.log(err));
            }))
        }
    })
});

module.exports = router;