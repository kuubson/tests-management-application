const router = require('express').Router();
const Question = require('../models/Question');
const fs = require('fs');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg");
    }
})
const upload = multer({ storage: storage })

router.post('/saveQuestion', upload.single('image'), (req, res) => {
    const { body, answerA, answerB, answerC, answerD, properAnswer, category } = req.body;
    Question.findOne({
        body
    }).then(question => {
        if (question) {
            res.send({
                done: false,
                message: 'This question is already in the database!'
            });
        } else {
            if (req.file) {
                newQuestion = new Question({
                    body,
                    answerA,
                    answerB,
                    answerC,
                    answerD,
                    properAnswer,
                    category,
                    image: {
                        data: fs.readFileSync(req.file.path),
                        contentType: 'image/png'
                    }
                })
            } else {
                newQuestion = new Question({
                    body,
                    answerA,
                    answerB,
                    answerC,
                    answerD,
                    properAnswer,
                    category,
                    image: ""
                })
            }
            newQuestion.save().then(res.send({
                done: true,
                message: 'Question was added to the database!'
            })).catch(error => console.log(error));
        }
    })
})

module.exports = router;