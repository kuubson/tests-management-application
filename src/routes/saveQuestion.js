const router = require('express').Router();
const Question = require('../models/Question');
const fs = require('fs');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg");
    }
})
const upload = multer({ storage: storage }).single('myImage');

router.post('/upload', upload, (req, res) => {
    console.log(req.file)
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
                    image: "none"
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