import React, { Component } from 'react'
import axios from 'axios';

import Validation from '../../helpers/Validation'
import { getJwt } from '../../helpers/getJwt'

import LoginForm from './LoginForm'

export class Login extends Component {
    componentWillMount() {
        getJwt() ? this.props.history.push('/account') : this.props.history.push('/')
    }
    state = {
        login: "",
        password: "",
        errorLOGIN: "",
        errorPASSWORD: "",
        error: "",
        success: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {

        e.preventDefault();
        const { login, password } = this.state;
        const validation = Validation.loginFormValidation(login, password);
        this.setState(validation);
        if (validation.isValid) {
            const loginProcess = await axios.post('/login', {
                login,
                password,
            })
            loginProcess.data.done ? this.setState({ "success": loginProcess.data.message, "error": "" }) || sessionStorage.setItem('jwt', loginProcess.data.token) || setTimeout(() => {
                this.props.history.push('/account')
            }, 1000) : this.setState({ "error": loginProcess.data.message, "success": "" })
        }

    }
    render() {
        return (
            <div className="login flexfullwh">
                <LoginForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    errorLOGIN={this.state.errorLOGIN}
                    errorPASSWORD={this.state.errorPASSWORD}
                    error={this.state.error}
                    success={this.state.success}
                />
            </div>
        )
    }
}

export default Login
