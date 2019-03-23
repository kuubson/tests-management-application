import React, { Component } from 'react'
import Logout from './Logout';
import axios from 'axios'
import $ from 'jquery'
import { jspdf } from '../helpers/jspdf'
import { clearString } from '../helpers/clearString'

export class Teacher extends Component {
    componentDidMount() {
        this.props.socket.emit('studentsOnline');
        this.props.socket.on('receiveTestResult', (student, result) => {
            alert(`Student ${student} ended his test! He gained ${result} points`)
        })
        this.props.socket.on('studentsList', (studentsList) => {
            const list = studentsList.map(student => {
                return (
                    <li className="student" key={student.id} onClick={() => this.handleSend(student.id)}>{student.login}</li>
                )
            })
            this.setState({
                studentsList: list
            })
        })
    }
    state = {
        isGenerated: "",
        exampleTest: "",
        questionsArray: "",
        numberOfQuestions: "",
        errors: "",
        studentsList: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        this.setState({
            isGenerated: false,
            exampleTest: "",
            questionsArray: "",
            numberOfQuestions: "",
        })
    }
    printPdf = () => {
        jspdf(this.state.questionsArray, clearString);
    }
    handleDeleteQuestion = (id) => {
        const temporaryQuestionsArray = Object.values(this.state.questionsArray);
        const newQuestionsArray = temporaryQuestionsArray.filter(question => {
            return question._id !== id
        })
        let counter = 0;
        const test = newQuestionsArray.map(question => {
            counter++;
            return (
                <div className="question" key={question._id} onClick={() => this.handleDeleteQuestion(question._id)}>
                    {(!question.imageUrl.startsWith("img/")) ? (null) : (
                        <img src={question.imageUrl} alt={question.imageUrl} />
                    )}
                    <div className="body">{counter + ". " + question.body}</div>
                    <div className="answer">{"A. " + question.answerA}</div>
                    <div className="answer">{"B. " + question.answerB}</div>
                    <div className="answer">{"C. " + question.answerC}</div>
                    <div className="answer">{"D. " + question.answerD}</div>
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
    handleSend = (id) => {
        this.props.socket.emit('sendMessage', id, this.state.questionsArray);
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
                    let counter = 0;
                    const test = questionsArray.map(question => {
                        counter++;
                        return (
                            <div className="question" key={question._id} onClick={() => this.handleDeleteQuestion(question._id)}>
                                {(!question.imageUrl.startsWith("img/")) ? (null) : (
                                    <img src={question.imageUrl} alt={question.imageUrl} />
                                )}
                                <div className="body">{counter + ". " + question.body}</div>
                                <div className="answer">{"A. " + question.answerA}</div>
                                <div className="answer">{"B. " + question.answerB}</div>
                                <div className="answer">{"C. " + question.answerC}</div>
                                <div className="answer">{"D. " + question.answerD}</div>
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
                    <Logout socket={this.props.socket} />
                    <div className="studentsList">{this.state.studentsList}</div>
                    <button className="cancel" onClick={this.handleClick}>Cancel</button>
                    <button className="pdf" onClick={this.printPdf}>Print to PDF</button>
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
                    <Logout socket={this.props.socket} />
                    <div className="studentsList">{this.state.studentsList}</div>
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
