import React, { Component } from 'react'
import Logout from './Logout';
import $ from 'jquery'

export class Student extends Component {
    state = {
        test: "",
        isGenerated: false,
        studentAnswers: [],
        properAnswers: []
    }
    componentDidMount() {
        this.props.socket.emit('login', {
            login: this.props.login,
            role: this.props.role
        });
        this.props.socket.on('loginStatus', (isLogged) => {
            if (isLogged) {
                $('.logout').click();
                this.props.socket.emit('sendWarning', "You are already logged in another tab!");
                this.props.socket.emit('studentsList');
            }
        })
        this.props.socket.on('receiveMessage', (questionsArray) => {
            $('.submit').show();
            this.setState({
                test: "",
                studentAnswers: [],
                properAnswers: []
            })
            const temporaryQuestionArray = Object.values(questionsArray);
            let counter = 0;
            const test = temporaryQuestionArray.map(question => {
                this.state.properAnswers.push(question.properAnswer);
                counter++;
                return (
                    <div className="question" key={question._id}>
                        {(!question.imageUrl.startsWith("img/")) ? (null) : (
                            <img src={question.imageUrl} alt={question.imageUrl} />
                        )}
                        <div>
                            <div className="body">{counter + ". " + question.body}</div>
                            <input type="radio" name={question._id} className="answerRadio" value="A" />
                            <div className="answer">{"A. " + question.answerA}</div>
                            <input type="radio" name={question._id} className="answerRadio" value="B" />
                            <div className="answer">{"B. " + question.answerB}</div>
                            <input type="radio" name={question._id} className="answerRadio" value="C" />
                            <div className="answer">{"C. " + question.answerC}</div>
                            <input type="radio" name={question._id} className="answerRadio" value="D" />
                            <div className="answer">{"D. " + question.answerD}</div>
                        </div>
                    </div>
                )
            })
            this.setState({
                test,
                isGenerated: true
            })
        })
    }
    checkAnswers = () => {
        const studentAnswers = $('.answerRadio');
        const allAnswers = $('.answer');
        let points = 0;

        const indexes = [];
        const savedStudentAnswers = [];

        for (let x = 0; x < studentAnswers.length; x++) {
            if (studentAnswers[x].checked) {
                indexes.push(x);
                savedStudentAnswers.push(studentAnswers[x].value);
            }
        }

        for (let x = 0; x < savedStudentAnswers.length; x++) {
            if (savedStudentAnswers[x] === this.state.properAnswers[x]) {
                allAnswers[indexes[x]].style.color = 'green'
                points++;
            } else {
                allAnswers[indexes[x]].style.color = 'red'
            }
        }

        this.props.socket.emit('sendTestResults', this.props.login, points);
        $('.submit').hide();

    }
    render() {
        if (this.state.isGenerated === false) {
            return (
                <div className="student flexfullwh">
                    <Logout socket={this.props.socket} />
                    <span className="center">Please wait untill your teacher send you a test</span>
                </div>
            )
        } else {
            return (
                <div className="student flexfullwh">
                    <Logout socket={this.props.socket} />
                    <div className="test flexfullwh">
                        <div className="questions center">
                            {this.state.test}
                            <button className="submit" type="submit" onClick={this.checkAnswers}>Submit answers</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Student