import React, { Component } from 'react'
import axios from 'axios'

import Validation from '../../../helpers/Validation'

import TeacherForm from './TeacherForm'
import OrderedTest from './OrderedTest';

export class Teacher extends Component {
    state = {
        amount: "",
        category: "",
        questions: "",
        errorAMOUNT: "",
        errorCATEGORY: "",
        error: "",
        success: ""
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
    cancel = () => {
        this.setState({
            amount: "",
            category: "",
            questions: ""
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { amount, category } = this.state
        const validation = Validation.teacherFormValidation(amount, category);
        this.setState(validation);
        if (validation.isValid) {
            const gettingTestProcess = await axios.post('/getTest', {
                amount,
                category
            })
            gettingTestProcess.data.done ? this.setState({ "questions": gettingTestProcess.data.questions, "error": "", success: "" }) : this.setState({ "error": gettingTestProcess.data.message, "success": "", "questions": "" });
        }
    }
    render() {
        return (
            <div className="teacher flexfullwh">
                {this.state.questions === "" ? <TeacherForm
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleSelectChange={this.handleSelectChange}
                    errorAMOUNT={this.state.errorAMOUNT}
                    errorCATEGORY={this.state.errorCATEGORY}
                    error={this.state.error}
                    success={this.state.success}
                /> : <OrderedTest questions={this.state.questions} cancel={this.cancel} update={this.update} />}
            </div>
        )
    }
}

export default Teacher
