import React, { Component } from 'react'
import axios from 'axios';

import Validation from '../../helpers/Validation'
import { getJwt } from '../../helpers/getJwt'

import RegisterForm from './RegisterForm'

export class Register extends Component {
    componentWillMount() {
        if (getJwt()) {
            this.props.history.push('/account');
        }
    }
    state = {
        login: "",
        password: "",
        password2: "",
        type: "",
        userKey: "",
        errorLOGIN: "",
        errorPASSWORD: "",
        errorPASSWORD2: "",
        errorTYPE: "",
        errorUSERKEY: "",
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
            type: e.target.value
        })
    }
    handleSubmit = async (e) => {
        this.setState({
            error: "",
            success: ""
        })
        e.preventDefault();
        const { login, password, password2, type, userKey } = this.state;
        const validation = Validation.registerFormValidation(login, password, password2, type, userKey);
        this.setState(validation);
        if (validation.isValid) {
            const registerProcess = await axios.post('/register', {
                login,
                password,
                type,
                userKey
            })
            registerProcess.data.done ? this.setState({ "success": registerProcess.data.message, "error": "" }) || setTimeout(() => {
                this.props.history.push('/')
            }, 1000) : this.setState({ "error": registerProcess.data.message, "success": "" })
        }

    }
    render() {
        return (
            <div className="register flexfullwh">
                <RegisterForm
                    handleChange={this.handleChange}
                    handleSelectChange={this.handleSelectChange}
                    handleSubmit={this.handleSubmit}
                    errorLOGIN={this.state.errorLOGIN}
                    errorPASSWORD={this.state.errorPASSWORD}
                    errorPASSWORD2={this.state.errorPASSWORD2}
                    errorTYPE={this.state.errorTYPE}
                    errorUSERKEY={this.state.errorUSERKEY}
                    error={this.state.error}
                    success={this.state.success}
                />
            </div>
        )
    }
}

export default Register
