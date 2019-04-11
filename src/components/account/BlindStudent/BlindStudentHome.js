import React, { Component } from 'react'

import Logout from '../Buttons/Logout'
import axios from 'axios'

export class BlindStudentHome extends Component {
    _isMounted = false;
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
        totalPoints: 0,
        currentQuestion: 0,
        currentAnswer: 0,
        isAnswered: false,
        canReceiveTest: true,
        canHear: true,
        canSpeak: "",
        speakTotalQuestions: "",
        speakTotalPoints: "",
        option: ""
    }
    serveQuestion = (test) => {

        if (this.state.canReceiveTest) {
            this.setState({
                canSpeak: true,
                canReceiveTest: false
            })
        }

        function leadingZero(time) {
            return (time < 10 ? '0' : '') + time;
        }

        function getTime() {
            let date = new Date();
            let year = date.getFullYear();
            let day = leadingZero(date.getDate());
            let month = leadingZero((date.getMonth() + 1));
            let hours = leadingZero(date.getHours());
            let minutes = leadingZero(date.getMinutes());
            let seconds = leadingZero(date.getSeconds());
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }

        let speech = window.speechSynthesis;

        this.setState({
            totalPoints: test.length
        })

        if (this.state.totalPoints === 1) {
            this.setState({
                speakTotalQuestions: "pytanie",
                speakTotalPoints: "punkt"
            })
        } else if (this.state.totalPoints === 2) {
            this.setState({
                speakTotalQuestions: "pytania",
                speakTotalPoints: "punkty"
            })
        } else if (this.state.totalPoints === 3) {
            this.setState({
                speakTotalQuestions: "pytania",
                speakTotalPoints: "punkty"
            })
        } else if (this.state.totalPoints === 4) {
            this.setState({
                speakTotalQuestions: "pytania",
                speakTotalPoints: "punkty"
            })
        } else {
            this.setState({
                speakTotalQuestions: "pytań",
                speakTotalPoints: "punktów"
            })
        }

        let choiceMessage = new SpeechSynthesisUtterance(
            `Wybierz proszę sposób rozwiązywania testu.
            Kliknij jedynkę na klawiaturze numerycznej górnej aby rozwiązywać test za pomocą klawiatury 
            lub kliknij dwójkę na klawiaturze numerycznej górnej aby używać własnej mowy`
        )

        let keyboardOptionMessage = new SpeechSynthesisUtterance(
            `Witaj! Twój nauczyciel wylosował Ci ${test.length} ${this.state.speakTotalQuestions}.
                Aby odsłuchać wiadomość powitalną ponownie naciśnij klawisz R
                Aby rozpocząć test odsłuchaj pierwsze pytanie klikając spację.
                Po zatwierdzeniu każdej udzielonej odpowiedzi otrzymasz informację czy była ona błędna czy poprawna. Kolejne pytanie wywołaj klawiszem spacja.
                Aby poruszać się pomiędzy odpowiedziami steruj klawiszami W oraz S. 
                Aby wybrać odpowiedź klikaj odpowiednio klawisze A, B, C lub D. 
                Aby zatwierdzić swoją odpowiedź kliknij klawisz ENTER.
                Aby przerwać mój głos użyj klawisza X.
                Gdy test dobiegnie końca zostaniesz o tym poinformowany!`
        );

        let voiceOptionMessage = new SpeechSynthesisUtterance(
            `Witaj! Twój nauczyciel wylosował Ci ${test.length} ${this.state.speakTotalQuestions}.
                Aby korzystać z funkcji sterowania głosem musisz mówić płynnie i wyraźnie. W przypadku nieuzyskania żadnej odpowiedzi kliknij ponownie F i powiedz komendę.
                Aby odsłuchać wiadomość powitalną ponownie naciśnij F na klawiaturze i powiedz "instrukcja".
                Aby rozpocząć test odsłuchaj pierwsze pytanie klikając F na klawiaturze i powiedz "pytanie". 
                Po zatwierdzeniu każdej udzielonej odpowiedzi otrzymasz informację czy była ona błędna czy poprawna. Kolejne pytanie wywołaj klikając przycisk F i powiedz "pytanie".
                Aby poruszać się pomiędzy odpowiedziami kliknij F i powiedz "kolejna odpowiedź" lub "poprzednia odpowiedź". 
                Aby wybrać odpowiedź kliknij klawisz F i powiedz odpowiednio "odpowiedź a", "odpowiedź b", "odpowiedź c", "odpowiedź d". 
                Aby zatwierdzić swoją odpowiedź kliknij klawisz F i powiedz "zatwierdź".
                Gdy po kliknięciu klawisza F i powiedzenia poprawnej komendy nie usłyszysz żadnej odpowiedzi, musisz powtórzyć kliknięcie F oraz powiedzenie komendy na nowo.
                Gdy test dobiegnie końca zostaniesz o tym poinformowany!`
        );

        if (this.state.currentQuestion === 0) {
            setTimeout(() => {
                speech.speak(choiceMessage);
            }, 500);
        }

        if (this.state.currentQuestion <= test.length - 1) {

            this.setState({
                body: test[this.state.currentQuestion].body,
                answerA: test[this.state.currentQuestion].answerA,
                answerB: test[this.state.currentQuestion].answerB,
                answerC: test[this.state.currentQuestion].answerC,
                answerD: test[this.state.currentQuestion].answerD,
                properAnswer: test[this.state.currentQuestion].properAnswer,
                category: test[0].category,
                totalPoints: test.length
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

            document.body.onkeyup = (e) => {

                if (e.keyCode === 49) {

                    let alert = new SpeechSynthesisUtterance('Wybrałeś rozwiązywanie za pomocą klawiatury');
                    speech.cancel();
                    setTimeout(() => {
                        speech.speak(alert);
                    }, 500);

                    this.setState({
                        option: "keyboard"
                    })
                }

                if (e.keyCode === 50) {

                    let alert = new SpeechSynthesisUtterance('Wybrałeś rozwiązywanie za pomocą głosu');
                    speech.cancel();
                    setTimeout(() => {
                        speech.speak(alert);
                    }, 500);

                    this.setState({
                        option: "voice"
                    })
                }

                if (this.state.option === "keyboard") {

                    if (this.state.currentQuestion === 0) {
                        setTimeout(() => {
                            speech.speak(keyboardOptionMessage);
                        }, 500);
                    }

                    document.body.onkeyup = async (e) => {

                        if (this.state.canSpeak) {

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
                                console.log(this.state.currentAnswer);
                                if (this.state.currentAnswer === 1) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_A);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 2) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_B);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 3) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_C);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 4) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_D);
                                    }, 500);
                                } else {
                                    if (this.state.currentAnswer > 4) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(messageANSWER_A);
                                        }, 500);
                                        this.setState({
                                            currentAnswer: 1
                                        })
                                    }
                                }
                            }
                            if (e.keyCode === 83) {
                                this.setState({
                                    currentAnswer: this.state.currentAnswer - 1
                                })
                                console.log(this.state.currentAnswer);
                                if (this.state.currentAnswer === 1) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_A);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 2) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_B);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 3) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_C);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 4) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_D);
                                    }, 500);
                                } else {
                                    if (this.state.currentAnswer < 1) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(messageANSWER_A);
                                        }, 500);
                                        this.setState({
                                            currentAnswer: 1
                                        })
                                    }
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

                            if (e.keyCode === 82) {
                                speech.cancel();
                                setTimeout(() => {
                                    speech.speak(keyboardOptionMessage);
                                }, 500);
                            }

                        } else {
                            if (e.keyCode === 82) {
                                speech.cancel();
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance('Test dobiegł końca. Interakcja z testem została zablokowana!'));
                                }, 500);
                            }
                        }
                        if (e.keyCode === 88) {
                            speech.cancel();
                        }
                        if (this.state.isAnswered) {
                            if (e.keyCode === 13) {
                                if (this.state.userAnswer === this.state.properAnswer) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(new SpeechSynthesisUtterance('Poprawna odpowiedź.'));
                                    }, 500);
                                    this.setState({
                                        points: this.state.points + 1,
                                        currentQuestion: this.state.currentQuestion + 1,
                                        currentAnswer: 0,
                                        isAnswered: false
                                    })
                                    if (this.state.currentQuestion <= test.length - 1) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance('Kliknij spację aby usłyszeć kolejne pytanie'));
                                        }, 500);
                                        this.serveQuestion(test);
                                    } else {
                                        this.setState({
                                            currentQuestion: this.state.currentQuestion - 1
                                        })
                                        speech.cancel();
                                        let points = this.state.points;
                                        let totalPoints = test.length;
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance(`Koniec testu. Twój wynik to ${points} na ${totalPoints} ${this.state.speakTotalPoints}. Wynik został przesłany do nauczyciela. Interakcja z testem została zablokowana!`));
                                        }, 500);
                                        let currentDate = getTime();
                                        if (this._isMounted) {
                                            let savingResultProcess = await axios.post('/saveResult', {
                                                login: this.state.login,
                                                category: this.state.category,
                                                points: this.state.points,
                                                totalPoints: totalPoints,
                                                percent: Math.round((this.state.points / test.length) * 100) + '%',
                                                date: currentDate
                                            })
                                            savingResultProcess.data.done && this.props.socket.emit('sendResult', {
                                                login: this.state.login,
                                            })
                                            this.setState({
                                                body: "",
                                                answerA: "",
                                                answerB: "",
                                                answerC: "",
                                                answerD: "",
                                                properAnswer: "",
                                                category: "",
                                                userAnswer: "",
                                                points: 0,
                                                totalPoints: 0,
                                                currentQuestion: 0,
                                                currentAnswer: 0,
                                                isAnswered: false,
                                                canSpeak: false,
                                                canReceiveTest: true
                                            })
                                        }
                                    }
                                } else {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(new SpeechSynthesisUtterance('Błędna odpowiedź.'));
                                    }, 500);
                                    this.setState({
                                        currentQuestion: this.state.currentQuestion + 1,
                                        currentAnswer: 0,
                                        isAnswered: false
                                    })
                                    if (this.state.currentQuestion <= test.length - 1) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance('Kliknij spację aby usłyszeć kolejne pytanie'));
                                        }, 500);
                                        this.serveQuestion(test);
                                    } else {
                                        this.setState({
                                            currentQuestion: this.state.currentQuestion - 1
                                        })
                                        speech.cancel();
                                        let points = this.state.points;
                                        let totalPoints = test.length;
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance(`Koniec testu. Twój wynik to ${points} na ${totalPoints} ${this.state.speakTotalPoints}. Wynik został przesłany do nauczyciela. Interakcja z testem została zablokowana!`));
                                        }, 500);
                                        let currentDate = getTime();
                                        if (this._isMounted) {
                                            let savingResultProcess = await axios.post('/saveResult', {
                                                login: this.state.login,
                                                category: this.state.category,
                                                points: this.state.points,
                                                totalPoints: totalPoints,
                                                percent: Math.round((this.state.points / test.length) * 100) + '%',
                                                date: currentDate
                                            })
                                            savingResultProcess.data.done && this.props.socket.emit('sendResult', {
                                                login: this.state.login,
                                            })
                                            this.setState({
                                                body: "",
                                                answerA: "",
                                                answerB: "",
                                                answerC: "",
                                                answerD: "",
                                                properAnswer: "",
                                                category: "",
                                                userAnswer: "",
                                                points: 0,
                                                totalPoints: 0,
                                                currentQuestion: 0,
                                                currentAnswer: 0,
                                                isAnswered: false,
                                                canSpeak: false,
                                                canReceiveTest: true
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (this.state.option === "voice") {

                    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
                    let recognition = new window.SpeechRecognition();
                    recognition.lang = 'pl-PL';

                    if (this.state.currentQuestion === 0) {
                        setTimeout(() => {
                            speech.speak(voiceOptionMessage);
                        }, 500);
                    }

                    document.body.onkeyup = (e) => {
                        if (this.state.canSpeak) {
                            if (e.keyCode === 70) {
                                if (this.state.canHear) {
                                    recognition.start();
                                }
                                this.setState({
                                    canHear: false
                                })
                            }
                            if (e.keyCode === 86) {
                                recognition.stop();
                            }
                        }
                    }

                    recognition.onend = () => {
                        this.setState({
                            canHear: true
                        })
                    }

                    recognition.onresult = async (e) => {

                        let transcript = e.results[0][0].transcript;
                        let lowerCaseTranscript = transcript.toString().toLowerCase();
                        console.log(lowerCaseTranscript);

                        if (this.state.canSpeak) {

                            if (lowerCaseTranscript === "odpowiedź a") {
                                speech.cancel();
                                this.setState({
                                    userAnswer: 'A',
                                    isAnswered: true
                                })
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź A, kliknij F na klawiaturze i powiedz "zatwierdź" aby zatwierdzić odpowiedź'));
                                }, 500);
                            }

                            if (lowerCaseTranscript === "odpowiedź b") {
                                speech.cancel();
                                this.setState({
                                    userAnswer: 'B',
                                    isAnswered: true
                                })
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź B, kliknij F na klawiaturze i powiedz "zatwierdź" aby zatwierdzić odpowiedź'));
                                }, 500);
                            }

                            if (lowerCaseTranscript === "odpowiedź c") {
                                speech.cancel();
                                this.setState({
                                    userAnswer: 'C',
                                    isAnswered: true
                                })
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź C, kliknij F na klawiaturze i powiedz "zatwierdź" aby zatwierdzić odpowiedź'));
                                }, 500);
                            }

                            if (lowerCaseTranscript === "odpowiedź d") {
                                speech.cancel();
                                this.setState({
                                    userAnswer: 'D',
                                    isAnswered: true
                                })
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance('Wybrałeś odpowiedź D, kliknij F na klawiaturze i powiedz "zatwierdź" aby zatwierdzić odpowiedź'));
                                }, 500);
                            }

                            if (lowerCaseTranscript === "pytanie") {
                                speech.cancel();
                                setTimeout(() => {
                                    speech.speak(voiceMessages[0]);
                                }, 500);
                            }

                            if (lowerCaseTranscript === "kolejna odpowiedź") {
                                this.setState({
                                    currentAnswer: this.state.currentAnswer + 1
                                })
                                console.log(this.state.currentAnswer);
                                if (this.state.currentAnswer === 1) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_A);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 2) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_B);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 3) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_C);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 4) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_D);
                                    }, 500);
                                } else {
                                    if (this.state.currentAnswer > 4) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(messageANSWER_A);
                                        }, 500);
                                        this.setState({
                                            currentAnswer: 1
                                        })
                                    }
                                }
                            }

                            if (lowerCaseTranscript === "poprzednia odpowiedź") {
                                this.setState({
                                    currentAnswer: this.state.currentAnswer - 1
                                })
                                console.log(this.state.currentAnswer);
                                if (this.state.currentAnswer === 1) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_A);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 2) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_B);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 3) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_C);
                                    }, 500);
                                }
                                else if (this.state.currentAnswer === 4) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(messageANSWER_D);
                                    }, 500);
                                } else {
                                    if (this.state.currentAnswer < 1) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(messageANSWER_A);
                                        }, 500);
                                        this.setState({
                                            currentAnswer: 1
                                        })
                                    }
                                }
                            }

                            if (lowerCaseTranscript === "instrukcja") {
                                speech.cancel();
                                setTimeout(() => {
                                    speech.speak(voiceOptionMessage);
                                }, 500);
                            }
                        } else {
                            if (lowerCaseTranscript === "instrukcja") {
                                speech.cancel();
                                setTimeout(() => {
                                    speech.speak(new SpeechSynthesisUtterance('Test dobiegł końca. Interakcja z testem została zablokowana!'));
                                }, 500);
                            }
                        }

                        if (this.state.isAnswered) {

                            if (lowerCaseTranscript === "zatwierdź") {

                                if (this.state.userAnswer === this.state.properAnswer) {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(new SpeechSynthesisUtterance('Poprawna odpowiedź.'));
                                    }, 500);
                                    this.setState({
                                        points: this.state.points + 1,
                                        currentQuestion: this.state.currentQuestion + 1,
                                        currentAnswer: 0,
                                        isAnswered: false
                                    })
                                    if (this.state.currentQuestion <= test.length - 1) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance('Kliknij F na klawiaturze i powiedz "pytanie" aby usłyszeć kolejne pytanie'));
                                        }, 500);
                                        this.serveQuestion(test);
                                    } else {
                                        this.setState({
                                            currentQuestion: this.state.currentQuestion - 1
                                        })
                                        speech.cancel();
                                        let points = this.state.points;
                                        let totalPoints = test.length;
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance(`Koniec testu. Twój wynik to ${points} na ${totalPoints} ${this.state.speakTotalPoints}. Wynik został przesłany do nauczyciela. Interakcja z testem została zablokowana!`));
                                        }, 500);
                                        let currentDate = getTime();
                                        if (this._isMounted) {
                                            let savingResultProcess = await axios.post('/saveResult', {
                                                login: this.state.login,
                                                category: this.state.category,
                                                points: this.state.points,
                                                totalPoints: totalPoints,
                                                percent: Math.round((this.state.points / test.length) * 100) + '%',
                                                date: currentDate
                                            })
                                            savingResultProcess.data.done && this.props.socket.emit('sendResult', {
                                                login: this.state.login,
                                            })
                                            this.setState({
                                                body: "",
                                                answerA: "",
                                                answerB: "",
                                                answerC: "",
                                                answerD: "",
                                                properAnswer: "",
                                                category: "",
                                                userAnswer: "",
                                                points: 0,
                                                totalPoints: 0,
                                                currentQuestion: 0,
                                                currentAnswer: 0,
                                                isAnswered: false,
                                                canSpeak: false,
                                                canReceiveTest: true
                                            })
                                        }
                                    }
                                } else {
                                    speech.cancel();
                                    setTimeout(() => {
                                        speech.speak(new SpeechSynthesisUtterance('Błędna odpowiedź.'));
                                    }, 500);
                                    this.setState({
                                        currentQuestion: this.state.currentQuestion + 1,
                                        currentAnswer: 0,
                                        isAnswered: false
                                    })
                                    if (this.state.currentQuestion <= test.length - 1) {
                                        speech.cancel();
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance('Kliknij F na klawiaturze i powiedz "pytanie" aby usłyszeć kolejne pytanie'));
                                        }, 500);
                                        this.serveQuestion(test);
                                    } else {
                                        this.setState({
                                            currentQuestion: this.state.currentQuestion - 1
                                        })
                                        speech.cancel();
                                        let points = this.state.points;
                                        let totalPoints = test.length;
                                        setTimeout(() => {
                                            speech.speak(new SpeechSynthesisUtterance(`Koniec testu. Twój wynik to ${points} na ${totalPoints} ${this.state.speakTotalPoints}. Wynik został przesłany do nauczyciela. Interakcja z testem została zablokowana!`));
                                        }, 500);
                                        let currentDate = getTime();
                                        if (this._isMounted) {
                                            let savingResultProcess = await axios.post('/saveResult', {
                                                login: this.state.login,
                                                category: this.state.category,
                                                points: this.state.points,
                                                totalPoints: totalPoints,
                                                percent: Math.round((this.state.points / test.length) * 100) + '%',
                                                date: currentDate
                                            })
                                            savingResultProcess.data.done && this.props.socket.emit('sendResult', {
                                                login: this.state.login,
                                            })
                                            this.setState({
                                                body: "",
                                                answerA: "",
                                                answerB: "",
                                                answerC: "",
                                                answerD: "",
                                                properAnswer: "",
                                                category: "",
                                                userAnswer: "",
                                                points: 0,
                                                totalPoints: 0,
                                                currentQuestion: 0,
                                                currentAnswer: 0,
                                                isAnswered: false,
                                                canSpeak: false,
                                                canReceiveTest: true
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.socket.on('sendTest', (test) => {
            if (this.state.canReceiveTest) {
                this.serveQuestion(test);
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
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
                        <div className="blind-student-info">
                            {this.state.body && <div className="alert alert-warning student-info">{`Witaj! Twój nauczyciel wylosował Ci ${this.state.totalPoints} ${this.state.speakTotalQuestions}`}</div>}
                            {this.state.option === "keyboard" ? <div>
                                <div className="alert alert-warning student-info">Aby odsłuchać wiadomość powitalną ponownie naciśnij klawisz R</div>
                                <div className="alert alert-warning student-info">Aby rozpocząć test odsłuchaj pierwsze pytanie klikając spację.</div>
                                <div className="alert alert-warning student-info">Po zatwierdzeniu każdej udzielonej odpowiedzi otrzymasz informację czy była ona błędna czy poprawna. Kolejne pytanie wywołaj klawiszem spacja</div>
                                <div className="alert alert-warning student-info">Aby poruszać się pomiędzy odpowiedziami steruj klawiszami W oraz S. </div>
                                <div className="alert alert-warning student-info">Aby wybrać odpowiedź klikaj odpowiednio klawisze A, B, C lub D.</div>
                                <div className="alert alert-warning student-info">Aby zatwierdzić swoją odpowiedź kliknij klawisz ENTER.</div>
                                <div className="alert alert-warning student-info">Aby przerwać czytanie użyj klawisza X.</div>
                                <div className="alert alert-warning student-info">Gdy test dobiegnie końca zostaniesz o tym poinformowany!</div>
                            </div> : this.state.option === "voice" ? <div>
                                <div className="alert alert-warning student-info">Aby korzystać z funkcji sterowania głosem musisz mówić płynnie i wyraźnie. W przypadku nieuzyskania żadnej odpowiedzi kliknij ponownie F i powiedz komendę.</div>
                                <div className="alert alert-warning student-info">Aby odsłuchać wiadomość powitalną ponownie naciśnij F na klawiaturze i powiedz "instrukcja".</div>
                                <div className="alert alert-warning student-info">Aby rozpocząć test odsłuchaj pierwsze pytanie klikając F na klawiaturze i powiedz "pytanie".</div>
                                <div className="alert alert-warning student-info">Po zatwierdzeniu każdej udzielonej odpowiedzi otrzymasz informację czy była ona błędna czy poprawna. Kolejne pytanie wywołaj klikając przycisk F i powiedz "pytanie".</div>
                                <div className="alert alert-warning student-info">Aby poruszać się pomiędzy odpowiedziami kliknij F i powiedz "kolejna odpowiedź" lub "poprzednia odpowiedź".</div>
                                <div className="alert alert-warning student-info">Aby wybrać odpowiedź kliknij klawisz F i powiedz odpowiednio "odpowiedź a", "odpowiedź b", "odpowiedź c", "odpowiedź d".</div>
                                <div className="alert alert-warning student-info">Aby zatwierdzić swoją odpowiedź kliknij klawisz F i powiedz "zatwierdź".</div>
                                <div className="alert alert-warning student-info">Gdy po kliknięciu klawisza F i powiedzenia poprawnej komendy nie usłyszysz żadnej odpowiedzi, musisz powtórzyć kliknięcie F oraz powiedzenie komendy na nowo.</div>
                                <div className="alert alert-warning student-info">Gdy test dobiegnie końca zostaniesz o tym poinformowany!</div>
                            </div> : <div>
                                        <div className="alert alert-success student-info">Instrukcje dla opcji rozwiązywania testu za pomocą klawiatury</div>
                                        <div className="alert alert-warning student-info">Aby odsłuchać wiadomość powitalną ponownie naciśnij klawisz R</div>
                                        <div className="alert alert-warning student-info">Aby rozpocząć test odsłuchaj pierwsze pytanie klikając spację.</div>
                                        <div className="alert alert-warning student-info">Po zatwierdzeniu każdej udzielonej odpowiedzi otrzymasz informację czy była ona błędna czy poprawna. Kolejne pytanie wywołaj klawiszem spacja</div>
                                        <div className="alert alert-warning student-info">Aby poruszać się pomiędzy odpowiedziami steruj klawiszami W oraz S. </div>
                                        <div className="alert alert-warning student-info">Aby wybrać odpowiedź klikaj odpowiednio klawisze A, B, C lub D.</div>
                                        <div className="alert alert-warning student-info">Aby zatwierdzić swoją odpowiedź kliknij klawisz ENTER.</div>
                                        <div className="alert alert-warning student-info">Aby przerwać czytanie użyj klawisza X.</div>
                                        <div className="alert alert-warning student-info">Gdy test dobiegnie końca zostaniesz o tym poinformowany!</div>
                                        <div className="alert alert-success student-info">Instrukcje dla opcji rozwiązywania testu za pomocą głosu</div>
                                        <div className="alert alert-warning student-info">Aby korzystać z funkcji sterowania głosem musisz mówić płynnie i wyraźnie. W przypadku nieuzyskania żadnej odpowiedzi kliknij ponownie F i powiedz komendę.</div>
                                        <div className="alert alert-warning student-info">Aby odsłuchać wiadomość powitalną ponownie naciśnij F na klawiaturze i powiedz "instrukcja".</div>
                                        <div className="alert alert-warning student-info">Aby rozpocząć test odsłuchaj pierwsze pytanie klikając F na klawiaturze i powiedz "pytanie".</div>
                                        <div className="alert alert-warning student-info">Po zatwierdzeniu każdej udzielonej odpowiedzi otrzymasz informację czy była ona błędna czy poprawna. Kolejne pytanie wywołaj klikając przycisk F i powiedz "pytanie".</div>
                                        <div className="alert alert-warning student-info">Aby poruszać się pomiędzy odpowiedziami kliknij F i powiedz "kolejna odpowiedź" lub "poprzednia odpowiedź".</div>
                                        <div className="alert alert-warning student-info">Aby wybrać odpowiedź kliknij klawisz F i powiedz odpowiednio "odpowiedź a", "odpowiedź b", "odpowiedź c", "odpowiedź d".</div>
                                        <div className="alert alert-warning student-info">Aby zatwierdzić swoją odpowiedź kliknij klawisz F i powiedz "zatwierdź".</div>
                                        <div className="alert alert-warning student-info">Gdy po kliknięciu klawisza F i powiedzenia poprawnej komendy nie usłyszysz żadnej odpowiedzi, musisz powtórzyć kliknięcie F oraz powiedzenie komendy na nowo.</div>
                                        <div className="alert alert-warning student-info">Gdy test dobiegnie końca zostaniesz o tym poinformowany!</div>
                                    </div>}
                        </div>
                    </ul>
                </div>
                <div className="questions blindStudentQuestions center">
                    {this.state.body === "" ? <div>Please wait...</div> : <div className="question blindStudentQuestion">
                        <div className="body alert alert-dark font-weight-bold">{this.state.currentQuestion + 1 + ". " + this.state.body}</div>
                        <div className="aswer alert alert-success">{"A. " + this.state.answerA}</div>
                        <div className="aswer alert alert-success">{"B. " + this.state.answerB}</div>
                        <div className="aswer alert alert-success">{"C. " + this.state.answerC}</div>
                        <div className="aswer alert alert-success">{"D. " + this.state.answerD}</div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default BlindStudentHome