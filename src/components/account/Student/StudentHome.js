import React, { Component } from 'react'
import Logout from '../Buttons/Logout'
import $ from 'jquery'
import axios from 'axios';

export class StudentHome extends Component {
    state = {
        questions: "",
        orderedTest: "",
        properAnswers: [],
        login: "",
        category: ""
    }
    componentDidMount() {
        this.props.socket.on('sendTest', (questions) => {
            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            shuffleArray(questions);
            this.setState({ questions, category: questions[0].category, login: this.props.login });
            this.organizeQuestions(this.state.questions);
        })
    }
    organizeQuestions = (questions) => {
        let counter = 0;
        const orderedTest = questions.map(question => {
            this.state.properAnswers.push(question.properAnswer);
            counter++;
            return (
                <div className="question" key={question._id}>
                    {(!question.imageUrl.startsWith("img/")) ? (null) : (
                        <img src={question.imageUrl} alt={question.imageUrl} />
                    )}
                    <div className="body alert alert-dark font-weight-bold">{counter + ". " + question.body}</div>
                    <input id={`answerRadio1${question._id}`} type="radio" name={question._id} className="answerRadio" value="A" />
                    <label htmlFor={`answerRadio1${question._id}`} className="label">
                        <div className="answer studentAnswer alert alert-success">
                            {"A. " + question.answerA}
                        </div>
                    </label>
                    <input id={`answerRadio2${question._id}`} type="radio" name={question._id} className="answerRadio" value="B" />
                    <label htmlFor={`answerRadio2${question._id}`} className="label">
                        <div className="answer studentAnswer alert alert-success">
                            {"B. " + question.answerB}
                        </div>
                    </label>
                    <input id={`answerRadio3${question._id}`} type="radio" name={question._id} className="answerRadio" value="C" />
                    <label htmlFor={`answerRadio3${question._id}`} className="label">
                        <div className="answer studentAnswer alert alert-success">
                            {"C. " + question.answerC}
                        </div>
                    </label>
                    <input id={`answerRadio4${question._id}`} type="radio" name={question._id} className="answerRadio" value="D" />
                    <label htmlFor={`answerRadio4${question._id}`} className="label">
                        <div className="answer studentAnswer alert alert-success">
                            {"D. " + question.answerD}
                        </div>
                    </label>
                </div>
            )
        })
        this.setState({
            orderedTest
        });
    }
    checkAnswers = async () => {

        const indexes = [];
        const studentAnswers = $('.answerRadio');
        const savedStudentAnswers = [];
        const allAnswers = $('.answer');
        let points = 0;

        for (let x = 0; x < studentAnswers.length; x++) {
            if (studentAnswers[x].checked) {
                indexes.push(x);
                savedStudentAnswers.push(studentAnswers[x].value);
            }
            studentAnswers[x].disabled = true;
        }

        for (let x = 0; x < savedStudentAnswers.length; x++) {
            if (savedStudentAnswers[x] === this.state.properAnswers[x]) {
                allAnswers[indexes[x]].style.background = 'green'
                points++;
            } else {
                allAnswers[indexes[x]].style.background = 'red'
            }
        }

        function leadingZero(time) {
            return (time < 10 ? '0' : '') + time;
        }

        const date = new Date();
        const year = date.getFullYear();
        const day = leadingZero(date.getDate());
        const month = leadingZero((date.getMonth() + 1));
        const hours = leadingZero(date.getHours());
        const minutes = leadingZero(date.getMinutes());
        const seconds = leadingZero(date.getSeconds());
        const currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

        const savingResultProcess = await axios.post('/saveResult', {
            login: this.state.login,
            category: this.state.category,
            points: points,
            totalPoints: this.state.questions.length,
            percent: Math.round((points / this.state.questions.length) * 100) + '%',
            date: currentDate
        })

        savingResultProcess.data.done && this.props.socket.emit('sendResult', {
            login: this.state.login,
        })

        $('.submit').prop("disabled", true);

    }
    render() {
        return (
            <div className="menu">
                <div className="menu-list">
                    <ul className="menu-items">
                        <div className="buttons">
                            <div className="welcome">
                                Welcome {this.props.login}
                            </div>
                            <li><Logout /></li>
                        </div>
                    </ul>
                </div>
                <div className="questions center">
                    {this.state.orderedTest ? <div>
                        {this.state.orderedTest}
                        <button className="btn btn-dark submit" onClick={this.checkAnswers}>Submit answers</button>
                    </div> : <div>Please wait...</div>}
                </div>
            </div>
        )
    }
}

export default StudentHome
