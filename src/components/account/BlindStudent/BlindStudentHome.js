import React, { Component } from 'react'

import Logout from '../Buttons/Logout'
import axios from 'axios'

export class BlindStudentHome extends Component {
    state = {
        login: this.props.login,
        body: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        properAnswer: "",
        category: "",
        userAnswer: "",
        points: 0,
        currentQuestion: 0,
        currentAnswer: 0,
        isAnswered: false
    }
    serveQuestion = (test) => {

        function leadingZero(time) {
            return (time < 10 ? '0' : '') + time;
        }

        function getTime() {
            const date = new Date();
            const year = date.getFullYear();
            const day = leadingZero(date.getDate());
            const month = leadingZero((date.getMonth() + 1));
            const hours = leadingZero(date.getHours());
            const minutes = leadingZero(date.getMinutes());
            const seconds = leadingZero(date.getSeconds());
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }

        let speech = window.speechSynthesis;

        speech.speak(new SpeechSynthesisUtterance
            (`Witaj! Twój nauczyciel wylosował Ci ${test.length} pytań. 
            Aby rozpocząść test odsłuchaj pierwsze pytanie klikając spację. 
            Aby poruszać się pomiędzy odpowiedziami steruj klawiszami W oraz S. 
            Aby wybrać odpowiedź klikaj odpowiednio klawisze A, B, C lub D. 
            Aby zatwierdzić swoją odpowiedź kliknij klawisz ENTER.
            Aby przerwać mój głos użyj klawisza X.
            Gdy test dobiegnie końca zostaniesz o tym poinformowany!`
            ));

        if (this.state.currentQuestion <= test.length - 1) {

            this.setState({
                body: test[this.state.currentQuestion].body,
                answerA: test[this.state.currentQuestion].answerA,
                answerB: test[this.state.currentQuestion].answerB,
                answerC: test[this.state.currentQuestion].answerC,
                answerD: test[this.state.currentQuestion].answerD,
                properAnswer: test[this.state.currentQuestion].properAnswer,
                category: test[0].category
            })

            let messageBODY = new SpeechSynthesisUtterance(`Pytanie ${this.state.currentQuestion + 1}` + this.state.body);
            let messageANSWER_A = new SpeechSynthesisUtterance('Odpowiedź A : ' + this.state.answerA);
            let messageANSWER_B = new SpeechSynthesisUtterance('Odpowiedź B : ' + this.state.answerB);
            let messageANSWER_C = new SpeechSynthesisUtterance('Odpowiedź C : ' + this.state.answerC);
            let messageANSWER_D = new SpeechSynthesisUtterance('Odpowiedź D : ' + this.state.answerD);

            let voiceMessages = [];
            voiceMessages.push(messageBODY);
            voiceMessages.push(messageANSWER_A);
            voiceMessages.push(messageANSWER_B);
            voiceMessages.push(messageANSWER_C);
            voiceMessages.push(messageANSWER_D);

            document.body.onkeyup = async (e) => {
                if (e.keyCode === 32) {
                    speech.cancel();
                    setTimeout(() => {
                        speech.speak(voiceMessages[0]);
                    }, 500);
                }
                if (e.keyCode === 87) {
                    this.setState({
                        currentAnswer: this.state.currentAnswer + 1
                    })
                    speech.cancel();
                    if (this.state.currentAnswer >= 0 && this.state.currentAnswer <= 4) {
                        setTimeout(() => {
                            speech.speak(voiceMessages[this.state.currentAnswer]);
                        }, 500);
                    }
                }
                if (e.keyCode === 83) {
                    this.setState({
                        currentAnswer: this.state.currentAnswer - 1
                    })
                    speech.cancel();
                    if (this.state.currentAnswer >= 0 && this.state.currentAnswer <= 4) {
                        setTimeout(() => {
                            speech.speak(voiceMessages[this.state.currentAnswer]);
                        }, 500);
                    }
                }
                if (e.keyCode === 65) {
                    speech.cancel();
                    this.setState({
                        userAnswer: 'A',
                        isAnswered: true
                    })
                    setTimeout(() => {
                        speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź A, kliknij enter aby zatwierdzić odpowiedź'));
                    }, 500);
                }
                if (e.keyCode === 66) {
                    speech.cancel();
                    this.setState({
                        userAnswer: 'B',
                        isAnswered: true
                    })
                    setTimeout(() => {
                        speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź B, kliknij enter aby zatwierdzić odpowiedź'));
                    }, 500);
                }
                if (e.keyCode === 67) {
                    speech.cancel();
                    this.setState({
                        userAnswer: 'C',
                        isAnswered: true
                    })
                    setTimeout(() => {
                        speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź C, kliknij enter aby zatwierdzić odpowiedź'));
                    }, 500);
                }
                if (e.keyCode === 68) {
                    speech.cancel();
                    this.setState({
                        userAnswer: 'D',
                        isAnswered: true
                    })
                    setTimeout(() => {
                        speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź D, kliknij enter aby zatwierdzić odpowiedź'));
                    }, 500);
                }
                if (e.keyCode === 88) {
                    speech.cancel();
                }
                if (this.state.isAnswered) {
                    if (e.keyCode === 13) {
                        if (this.state.userAnswer === this.state.properAnswer) {
                            speech.cancel();
                            setTimeout(() => {
                                speech.speak(new SpeechSynthesisUtterance('Poprawna odpowiedź'));
                            }, 500);
                            this.setState({
                                points: this.state.points + 1,
                                currentQuestion: this.state.currentQuestion + 1
                            })
                            if (this.state.currentQuestion <= test.length - 1) {
                                this.serveQuestion(test);
                            } else {
                                speech.cancel();
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance(`Koniec testu. Twój wynik to ${this.state.points} na ${test.length} punktów. Wynik został przesłany do nauczyciela.`));
                                }, 500);
                                const currentDate = getTime();
                                const savingResultProcess = await axios.post('/saveResult', {
                                    login: this.state.login,
                                    category: this.state.category,
                                    points: this.state.points,
                                    totalPoints: test.length,
                                    percent: Math.round((this.state.points / test.length) * 100) + '%',
                                    date: currentDate
                                })
                                savingResultProcess.data.done && this.props.socket.emit('sendResult', {
                                    login: this.state.login,
                                })
                            }
                        } else {
                            speech.cancel();
                            setTimeout(() => {
                                speech.speak(new SpeechSynthesisUtterance('Błędna odpowiedź'));
                            }, 500);
                            this.setState({
                                currentQuestion: this.state.currentQuestion + 1
                            })
                            if (this.state.currentQuestion <= test.length - 1) {
                                this.serveQuestion(test);
                            } else {
                                speech.cancel();
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance(`Koniec testu. Twój wynik to ${this.state.points} na ${test.length} punktów. Wynik został przesłany do nauczyciela.`));
                                }, 500);
                                const currentDate = getTime();
                                const savingResultProcess = await axios.post('/saveResult', {
                                    login: this.state.login,
                                    category: this.state.category,
                                    points: this.state.points,
                                    totalPoints: test.length,
                                    percent: Math.round((this.state.points / test.length) * 100) + '%',
                                    date: currentDate
                                })
                                savingResultProcess.data.done && this.props.socket.emit('sendResult', {
                                    login: this.state.login,
                                })
                            }
                        }
                    }
                }
            }
        }
    }
    componentDidMount() {
        this.props.socket.on('sendTest', (test) => {
            this.serveQuestion(test);
        })
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
                    {this.state.body === "" ? <div>Please wait...</div> : <div className="question">
                        <div className="body alert alert-dark font-weight-bold">{this.state.currentQuestion + 1 + ". " + this.state.body}</div>
                        <div className="body alert alert-success">{"A. " + this.state.answerA}</div>
                        <div className="body alert alert-success">{"B. " + this.state.answerB}</div>
                        <div className="body alert alert-success">{"C. " + this.state.answerC}</div>
                        <div className="body alert alert-success">{"D. " + this.state.answerD}</div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default BlindStudentHome