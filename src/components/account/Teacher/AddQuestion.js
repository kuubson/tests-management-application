import React, { Component } from 'react'

import AddQuestionForm from './AddQuestionForm'
import { getJwt } from '../../../helpers/getJwt'
import Validation from '../../../helpers/Validation';

import axios from 'axios'

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
        image: "",
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
        this.setState({
            image: e.target.files[0]
        })
    }
    handleSubmit = async (e) => {

        e.preventDefault();
        const { body, answerA, answerB, answerC, answerD, properAnswer, category, image } = this.state;
        const data = new FormData();
        data.append('body', body);
        data.append('answerA', answerA);
        data.append('answerB', answerB);
        data.append('answerC', answerC);
        data.append('answerD', answerD);
        data.append('properAnswer', properAnswer);
        data.append('category', category);
        data.append('myImage', image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const validation = Validation.newQuestionValidation(body, answerA, answerB, answerC, answerD, properAnswer, category)
        this.setState(validation);

        if (validation.isValid) {
            if (this._isMounted) {
                const savingTestProcess = await axios.post("/upload", data, config);
                savingTestProcess.data.done ? this.setState({ success: savingTestProcess.data.message, "error": "" }) || setTimeout(() => {
                    this.props.history.push('/account')
                }, 2500) : this.setState({ "error": savingTestProcess.data.message, "success": "" });
            }
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
