import React, { Component } from 'react'
import Logout from '../Buttons/Logout'

export class StudentHome extends Component {
    state = {
        questions: "",
        orderedTest: ""
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
            this.setState({ questions });
            this.organizeQuestions(this.state.questions);
        })
    }
    organizeQuestions = (questions) => {
        let counter = 0;
        const orderedTest = questions.map(question => {
            counter++;
            return (
                <div className="question" key={question._id}>
                    {(!question.imageUrl.startsWith("img/")) ? (null) : (
                        <img src={question.imageUrl} alt={question.imageUrl} />
                    )}
                    <div className="body alert alert-dark font-weight-bold">{counter + ". " + question.body}</div>
                    <div className="answer studentAnswer alert alert-success">
                        {"A. " + question.answerA}
                        <input type="radio" name={question._id} className="answerRadio1" value="A" />
                    </div>
                    <div className="answer studentAnswer alert alert-success">
                        {"B. " + question.answerB}
                        <input type="radio" name={question._id} className="answerRadio2" value="B" />
                    </div>
                    <div className="answer studentAnswer alert alert-success">
                        {"C. " + question.answerC}
                        <input type="radio" name={question._id} className="answerRadio3" value="C" />
                    </div>
                    <div className="answer studentAnswer alert alert-success">
                        {"D. " + question.answerD}
                        <input type="radio" name={question._id} className="answerRadio4" value="D" />
                    </div>
                </div>
            )
        })
        this.setState({
            orderedTest
        });
    }
    render() {
        return (
            <div className="menu">
                <div className="menu-list">
                    <ul className="menu-items">
                        <div className="buttons">
                            <li><Logout /></li>
                        </div>
                    </ul>
                </div>
                <div className="questions center">
                    {this.state.orderedTest}
                </div>
            </div>
        )
    }
}

export default StudentHome
