import React, { Component } from 'react'

import AddQuestionForm from './AddQuestionForm'
import { getJwt } from '../../../helpers/getJwt'
import Validation from '../../../helpers/Validation';

export class AddQuestion extends Component {
    _isMounted = false;
    componentWillMount() {
        if (!getJwt()) {
            this.props.history.push('/');
        }
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
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
            [e.target.name]: e.target.value
        })
    }
    handleFileChange = (e) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            console.log(reader.result);
        }
        const file = e.target.files[0];
        reader.readAsDataURL(file);
    }
    handleImage = (e) => {
        e.preventDefault();
        console.log('submitted image');
    }
    handleSubmit = (e) => {
        const { body, answerA, answerB, answerC, answerD, properAnswer, category } = this.state
        const validation = Validation.newQuestionValidation(body, answerA, answerB, answerC, answerD, properAnswer, category)
        this.setState(validation);
        console.log(validation.isValid);
        if (validation.isValid) {
            return true;
        } else {
            e.preventDefault();
        }
    }
    render() {
        return (
            <div className="add flexfullwh">
                <AddQuestionForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleSelectChange={this.handleSelectChange}
                    handleFileChange={this.handleFileChange}
                    handleImage={this.handleImage}
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
