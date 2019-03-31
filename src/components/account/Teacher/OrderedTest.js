import React, { Component } from 'react'
import Logout from '../Buttons/Logout';
import Cancel from '../Buttons/Cancel';
import Add from '../Buttons/Add'
import Print from '../Buttons/Print'
import $ from 'jquery'

export class OrderedTest extends Component {
    state = {
        questions: this.props.questions,
        orderedTest: ""
    }
    componentWillMount() {
        this.organizeQuestions(this.state.questions);
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
        if (this.state.questions.length - 1 === 0) {
            $('.cancel').click();
        }
        this.setState({
            questions: updatedQuestions,
            orderedTest: orderedTest
        });
    }
    render() {
        return (
            <div className="menu">
                <div className="menu-list">
                    <ul className="menu-items">
                        <div className="buttons">
                            <li><Logout /></li>
                            <li><Cancel cancel={this.props.cancel} /></li>
                            <li><Add /></li>
                            <li><Print questions={this.state.questions} /></li>
                        </div>
                        <div className="students">
                            {this.props.studentsList}
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
