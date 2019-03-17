const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Siema');
});

module.exports = router;