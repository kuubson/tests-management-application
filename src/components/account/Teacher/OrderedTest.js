import React, { Component } from 'react'
import Logout from '../Buttons/Logout';
import Cancel from '../Buttons/Cancel';
import Add from '../Buttons/Add'
import Print from '../Buttons/Print'
import $ from 'jquery'
import axios from 'axios'
const uuidv4 = require('uuid/v4');

export class OrderedTest extends Component {
    _isMounted = false;
    state = {
        questions: this.props.questions,
        orderedTest: "",
        results: ""
    }
    componentDidMount() {

        this._isMounted = true;

        this.organizeQuestions(this.state.questions);

        this.props.socket.on('sendResult', async (data) => {
            if (this._isMounted) {
                var gettingNewestResultProcess = await axios.post('/getNewestResult', {
                    login: data.login
                });
            }
            if (gettingNewestResultProcess) {
                this.props.setResults(gettingNewestResultProcess.data);
                const results = this.props.results.map(result => {
                    return (
                        <div className="result" key={uuidv4()}>
                            <p><b>Student:</b> {result.login}</p>
                            <p><b>Category:</b> {result.category}</p>
                            <p><b>Points:</b> {result.points}/{result.totalPoints} {result.percent}</p>
                            <p><b>Date:</b> {result.date}</p>
                        </div>
                    )
                })
                this.setState({ results })
            }
        })

    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    organizeQuestions = (questions) => {

        let counter = 0;
        const orderedTest = questions.map(question => {
            counter++;
            return (
                <div className="question" key={question._id} onClick={() => this.handleDeleteQuestion(question._id)}>
                    {(!question.imageUrl.startsWith("img/")) ? (null) : (
                        <img src={question.imageUrl} alt={question.imageUrl} />
                    )}
                    <div className="body alert alert-dark font-weight-bold">{counter + ". " + question.body}</div>
                    <div className="answer alert alert-success">{"A. " + question.answerA}</div>
                    <div className="answer alert alert-success">{"B. " + question.answerB}</div>
                    <div className="answer alert alert-success">{"C. " + question.answerC}</div>
                    <div className="answer alert alert-success">{"D. " + question.answerD}</div>
                </div>
            )
        })
        this.setState({
            orderedTest
        });

    }
    handleDeleteQuestion = (id) => {

        if (this._isMounted) {

            const updatedQuestions = this.state.questions.filter(question => {
                return question._id !== id
            })
            let counter = 0;
            const orderedTest = updatedQuestions.map(question => {
                counter++;
                return (
                    <div className="question" key={question._id} onClick={() => this.handleDeleteQuestion(question._id)}>
                        {(!question.imageUrl.startsWith("img/")) ? (null) : (
                            <img src={question.imageUrl} alt={question.imageUrl} />
                        )}
                        <div className="body alert alert-dark font-weight-bold">{counter + ". " + question.body}</div>
                        <div className="answer alert alert-success">{"A. " + question.answerA}</div>
                        <div className="answer alert alert-success">{"B. " + question.answerB}</div>
                        <div className="answer alert alert-success">{"C. " + question.answerC}</div>
                        <div className="answer alert alert-success">{"D. " + question.answerD}</div>
                    </div>
                )
            })
            if (this.state.questions.length === 2) {
                $('.cancel').click();
            }
            this.setState({
                questions: updatedQuestions,
                orderedTest: orderedTest
            });
            this.props.update(updatedQuestions);

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
                            <li><Cancel cancel={this.props.cancel} /></li>
                            <li><Add /></li>
                            <li><Print questions={this.state.questions} /></li>
                        </div>
                        <div className="info">
                            {this.props.studentsList !== "" && <div className="students">
                                {this.props.studentsList}
                            </div>}
                            {this.props.results !== "" && <div className="results">
                                {this.state.results}
                            </div>}
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

export default OrderedTest
