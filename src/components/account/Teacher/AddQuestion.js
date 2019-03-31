import React, { Component } from 'react'

import AddQuestionForm from './AddQuestionForm'
import { getJwt } from '../../../helpers/getJwt'
import Validation from '../../../helpers/Validation';

import axios from 'axios'

export class AddQuestion extends Component {
    componentWillMount() {
        if (!getJwt()) {
            this.props.history.push('/');
        }
    }
    state = {
        body: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        properAnswer: "",
        category: "",
        imageUrl: "",
        errorBODY: "",
        errorANSWER_A: "",
        errorANSWER_B: "",
        errorANSWER_C: "",
        errorANSWER_D: "",
        errorANSWER_PROPER: "",
        errorCATEGORY: "",
        errorIMAGEURL: "",
        error: "",
        success: ""
    }
    cancel = () => {
        this.setState({
            amount: "",
            category: "",
            questions: ""
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSelectChange = (e) => {
        this.setState({
            category: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { body, answerA, answerB, answerC, answerD, properAnswer, category, imageUrl } = this.state
        const validation = Validation.newQuestionValidation(body, answerA, answerB, answerC, answerD, properAnswer, category, imageUrl)
        this.setState(validation);
        if (validation.isValid) {
            const savingTestProcess = await axios.post('/saveQuestion', {
                body,
                answerA,
                answerB,
                answerC,
                answerD,
                properAnswer,
                category,
                imageUrl
            })
            savingTestProcess.data.done ? this.setState({ success: savingTestProcess.data.message, "error": "" }) : this.setState({ "error": savingTestProcess.data.message, "success": "" });
        }
    }
    render() {
        return (
            <div className="add flexfullwh">
                <AddQuestionForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleSelectChange={this.handleSelectChange}
                    errorBODY={this.state.errorBODY}
                    errorANSWER_A={this.state.errorANSWER_A}
                    errorANSWER_B={this.state.errorANSWER_B}
                    errorANSWER_C={this.state.errorANSWER_C}
                    errorANSWER_D={this.state.errorANSWER_D}
                    errorANSWER_PROPER={this.state.errorANSWER_PROPER}
                    errorCATEGORY={this.state.errorCATEGORY}
                    errorIMAGEURL={this.state.errorIMAGEURL}
                    success={this.state.success}
                    error={this.state.error}
                />
            </div>
        )
    }
}

export default AddQuestion
