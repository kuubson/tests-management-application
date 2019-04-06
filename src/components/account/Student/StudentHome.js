import React, { Component } from 'react'
import Logout from '../Buttons/Logout'
import $ from 'jquery'
import axios from 'axios';

export class StudentHome extends Component {
    _isMounted = false;
    state = {
        questions: "",
        orderedTest: "",
        properAnswers: [],
        login: this.props.login,
        category: "",
        points: "",
        percent: "",
        error: "",
        canReceiveTest: true
    }
    componentDidMount() {

        this._isMounted = true;

        this.props.socket.on('sendTest', (questions) => {

            $('.submit').prop("disabled", false);

            if (this.state.canReceiveTest) {
                this.setState({
                    questions: "",
                    orderedTest: "",
                    properAnswers: [],
                    category: "",
                    points: "",
                    percent: "",
                    error: "",
                })
            }

            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            shuffleArray(questions);

            if (this._isMounted === true) {
                if (this.state.canReceiveTest) {
                    this.setState({ questions, category: questions[0].category, properAnswers: [] });
                    this.organizeQuestions(this.state.questions);
                    this.setState({
                        canReceiveTest: false
                    })
                }
            }
        })

    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    organizeQuestions = (questions) => {
        let counter = 0;
        const orderedTest = questions.map(question => {
            this.setState({ properAnswers: [...this.state.properAnswers, question.properAnswer] });
            counter++;
            if ('image' in question) {
                let imageUrl = btoa(new Uint8Array(question.image.data.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                question.imageUrl = imageUrl;
            }
            return (
                <div className="question" key={question._id}>
                    {question.imageUrl && <img src={`data:image/jpeg;base64,${question.imageUrl}`} alt="question" />}
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
        }

        if (savedStudentAnswers.length === this.state.properAnswers.length) {

            for (let x = 0; x < savedStudentAnswers.length; x++) {

                /* console.log(`${savedStudentAnswers[x]} compared to ${this.state.properAnswers[x]}`); */
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

            if (this._isMounted) {

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

            }

            this.setState({
                canReceiveTest: true,
                points: points,
                percent: Math.round((points / this.state.questions.length) * 100) + '%'
            })

            for (let x = 0; x < studentAnswers.length; x++) {
                studentAnswers[x].disabled = true;
            }

            $('.submit').prop("disabled", true);

        } else {
            this.setState({
                error: "You have to give answer to all the questions"
            })
        }

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
                            {this.state.points !== "" && <li className="pointResult">Uzyskałeś {this.state.points}/{this.state.questions.length} punktów - {this.state.percent}</li>}
                        </div>
                    </ul>
                </div>
                <div className="questions center">
                    {this.state.orderedTest ? <div>
                        {this.state.orderedTest}
                        {this.state.error && <div className="alert alert-warning">{this.state.error}</div>}
                        <button className="btn btn-dark submit" onClick={this.checkAnswers}>Submit answers</button>
                    </div> : <div>Please wait...</div>}
                </div>
            </div>
        )
    }
}

export default StudentHome
