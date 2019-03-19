import React, { Component } from 'react'
import Logout from './Logout';
import axios from 'axios'
import $ from 'jquery'
import jsPDF from 'jspdf'

export class Teacher extends Component {
    state = {
        isGenerated: "",
        exampleTest: "",
        questionsArray: "",
        numberOfQuestions: "",
        errors: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = (e) => {
        this.setState({
            isGenerated: false
        })
    }
    removeDiacriticalMarks = (str) => {
        return str.replace(/ą/g, 'a').replace(/Ą/g, 'A')
            .replace(/ć/g, 'c').replace(/Ć/g, 'C')
            .replace(/ę/g, 'e').replace(/Ę/g, 'E')
            .replace(/ł/g, 'l').replace(/Ł/g, 'L')
            .replace(/ń/g, 'n').replace(/Ń/g, 'N')
            .replace(/ó/g, 'o').replace(/Ó/g, 'O')
            .replace(/ś/g, 's').replace(/Ś/g, 'S')
            .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
            .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
    }
    printPdf = () => {
        var doc = new jsPDF('portrait', 'mm', 'a4');
        var lMargin = 15; //left margin in mm
        var rMargin = 15; //right margin in mm
        var pdfInMM = 210;  // width of A4 in mm
        var pageCenter = pdfInMM / 2;
        doc.setFontSize(10);
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var height = 0;
        var marginTop = 20;
        height += marginTop;
        var counter = 1;
        var questionGap = 15;
        var answerGap = 7;

        for (var x = 0; x <= this.state.questionsArray.length - 1; x++) {

            let body = counter + ": " + this.state.questionsArray[x].body;
            let removeDiacriticalMarks = this.removeDiacriticalMarks(body);
            let content = doc.splitTextToSize(removeDiacriticalMarks, (pdfInMM - lMargin - rMargin));
            doc.text(content, pageCenter, height, 'center');
            height += answerGap;

            if (height > pageHeight - 30) {
                height = 0;
                height += marginTop;
                doc.addPage();
            }

            if ((this.state.questionsArray[x].imageUrl !== "") && (this.state.questionsArray[x].imageUrl.startsWith("img/"))) {

                var img = new Image();
                img.src = this.state.questionsArray[x].imageUrl;
                doc.addImage(img, pageCenter / 2.6, height, 140, 50);
                height += 60;

                if (height > pageHeight - 60) {
                    height = 0;
                    height += marginTop;
                    doc.addPage();
                }

            }

            if (height > pageHeight - 60) {
                height = 0;
                height += marginTop;
                doc.addPage();
            }

            let answerA = "A: " + this.state.questionsArray[x].answerA;
            let AremoveDiacriticalMarks = this.removeDiacriticalMarks(answerA);
            let Acontent = doc.splitTextToSize(AremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
            doc.text(Acontent, pageCenter, height, 'center');
            height += answerGap;

            let answerB = "B: " + this.state.questionsArray[x].answerB;
            let BremoveDiacriticalMarks = this.removeDiacriticalMarks(answerB);
            let Bcontent = doc.splitTextToSize(BremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
            doc.text(Bcontent, pageCenter, height, 'center');
            height += answerGap

            let answerC = "C: " + this.state.questionsArray[x].answerC;
            let CremoveDiacriticalMarks = this.removeDiacriticalMarks(answerC);
            let Ccontent = doc.splitTextToSize(CremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
            doc.text(Ccontent, pageCenter, height, 'center');
            height += answerGap;

            let answerD = "D: " + this.state.questionsArray[x].answerD;
            let DremoveDiacriticalMarks = this.removeDiacriticalMarks(answerD);
            let Dcontent = doc.splitTextToSize(DremoveDiacriticalMarks, (pdfInMM - lMargin - rMargin));
            doc.text(Dcontent, pageCenter, height, 'center');
            height += questionGap;

            if (height > pageHeight - (questionGap)) {
                height = 0;
                height += marginTop;
                doc.addPage();
            }
            counter++;
        }
        doc.save("Generated test.pdf");
    }
    handleDeleteQuestion = (id) => {
        const temporaryQuestionsArray = Object.values(this.state.questionsArray);
        const newQuestionsArray = temporaryQuestionsArray.filter(question => {
            return question._id !== id
        })
        const test = newQuestionsArray.map(question => {
            return (
                <div className="question" key={question._id} onClick={() => this.handleDeleteQuestion(question._id)}>
                    {(!question.imageUrl.startsWith("img/")) ? (null) : (
                        <img src={question.imageUrl} alt={question.imageUrl} />
                    )}
                    <div className="body">{question.body}</div>
                    <div className="answer">{question.answerA}</div>
                    <div className="answer">{question.answerB}</div>
                    <div className="answer">{question.answerC}</div>
                    <div className="answer">{question.answerD}</div>
                </div>
            )
        })
        if (this.state.questionsArray.length === 1) {
            this.setState({
                isGenerated: "",
                exampleTest: "",
                questionsArray: "",
                numberOfQuestions: "",
                errors: ""
            })
            $('.cancel').click();
        }
        this.setState({
            exampleTest: test,
            questionsArray: newQuestionsArray
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.numberOfQuestions !== "" && this.state.numberOfQuestions > 0) {
            axios.post("/test/getTest", {
                numberOfQuestions: this.state.numberOfQuestions
            }).then(response => {
                if (response.data.done === true) {
                    this.setState({
                        questionsArray: response.data.questions
                    })
                    const questionsArray = this.state.questionsArray;
                    const test = questionsArray.map(question => {
                        return (
                            <div className="question" key={question._id} onClick={() => this.handleDeleteQuestion(question._id)}>
                                {(!question.imageUrl.startsWith("img/")) ? (null) : (
                                    <img src={question.imageUrl} alt={question.imageUrl} />
                                )}
                                <div className="body">{question.body}</div>
                                <div className="answer">{question.answerA}</div>
                                <div className="answer">{question.answerB}</div>
                                <div className="answer">{question.answerC}</div>
                                <div className="answer">{question.answerD}</div>
                            </div>
                        )
                    })
                    this.setState({
                        isGenerated: true,
                        exampleTest: test,
                        questionsArray: questionsArray,
                        numberOfQuestions: "",
                        errors: ""
                    })
                } else {
                    this.setState({
                        isGenerated: "",
                        exampleTest: "",
                        questionsArray: "",
                        numberOfQuestions: "",
                        errors: response.data.msg
                    })
                }
            })
        } else {
            if (this.state.numberOfQuestions === "") {
                this.setState({
                    errors: "This field cannot be empty!"
                })
            }
            if (this.state.numberOfQuestions < 0) {
                this.setState({
                    errors: "This number cannot be negative!"
                })
            }
        }
    }
    render() {
        if (this.state.isGenerated === true) {
            return (
                <div className="teacher flexfullwh">
                    <div className="menu">
                        <Logout />
                        <button className="cancel" onClick={this.handleClick}>Cancel</button>
                        <button onClick={this.printPdf}>Print to PDF</button>
                    </div>
                    <div className="test flexfullwh">
                        <div className="questions center">
                            {this.state.exampleTest}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="teacher flexfullwh">
                    <Logout />
                    <form className="center" onSubmit={this.handleSubmit}>
                        <input id="numberOfQuestions" name="numberOfQuestions" placeholder="Type how much questions to draw lots" type="text" onChange={this.handleChange} /> <br />
                        <div className="error">{this.state.errors}</div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default Teacher
