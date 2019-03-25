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
        this.props.socket.on('receiveMessageBLIND', (questionsArray) => {

            this.setState({
                isGenerated: true
            })

            const testArray = Object.values(questionsArray);
            let runningQuestion = 0;
            var speech = window.speechSynthesis;
            speech.addEventListener('start', function () {
                alert('started');
            })
            function renderQuestions() {

                var counter = 0;
                var body, a, b, c, d;
                var array = [];
                $('.question').html(testArray[runningQuestion].body);
                body = new SpeechSynthesisUtterance(testArray[runningQuestion].body);
                $('.a').html(testArray[runningQuestion].answerA);
                a = new SpeechSynthesisUtterance(testArray[runningQuestion].answerA);
                $('.b').html(testArray[runningQuestion].answerB);
                b = new SpeechSynthesisUtterance(testArray[runningQuestion].answerB);
                $('.c').html(testArray[runningQuestion].answerC);
                c = new SpeechSynthesisUtterance(testArray[runningQuestion].answerC);
                $('.d').html(testArray[runningQuestion].answerD);
                d = new SpeechSynthesisUtterance(testArray[runningQuestion].answerD);
                array.push(body);
                array.push(a);
                array.push(b);
                array.push(c);
                array.push(d);
                setTimeout(() => {
                    speech.speak(array[0]);
                }, 1000);
                document.body.onkeyup = function (e, answer) {
                    if (e.keyCode === 87) {
                        counter++;
                        console.log(counter);
                        if (counter >= 0 && counter <= 4) {
                            speech.speak(array[counter]);
                        }
                        if (counter > 4) {
                            counter = 0
                        }
                    }
                    if (e.keyCode === 83) {
                        counter--;
                        console.log(counter);
                        if (counter >= 0 && counter <= 4) {
                            speech.speak(array[counter]);
                        }
                        if (counter < 0) {
                            counter = 4;
                        }
                    }

                    if (e.keyCode === 65) {
                        answer = 'A';
                        console.log('A');
                    }
                    else if (e.keyCode === 66) {
                        answer = 'B';
                        console.log('B');
                    }
                    else if (e.keyCode === 67) {
                        answer = 'C';
                        console.log('C');
                    }
                    else if (e.keyCode === 68) {
                        answer = 'D';
                        console.log('D');
                    }

                    if (answer === testArray[runningQuestion].properAnswer) {
                        console.log('good answer');
                        if (runningQuestion < testArray.length - 1) {
                            runningQuestion++;
                            renderQuestions();
                        }
                    }

                }
            }

            renderQuestions();

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
                    <span className="center">Please wait untill your teacher send you a test (BLIND STUDENT VERSION)</span>
                </div>
            )
        } else {
            return (
                <div className="student flexfullwh">
                    <Logout socket={this.props.socket} />
                    <div className="test flexfullwh">
                        <div className="questions center">
                            <div className="question"></div>
                            <div className="a"></div>
                            <div className="b"></div>
                            <div className="c"></div>
                            <div className="d"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default Student