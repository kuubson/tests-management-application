const router = require('express').Router();
const passport = require('passport');

router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({
        login: req.user.login,
        type: req.user.type,
    });
});

module.exports = router;