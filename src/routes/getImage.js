const router = require('express').Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/profile', upload.single('avatar'), (req, res, ) => {
    console.log(req.file);
})

module.exports = router;
