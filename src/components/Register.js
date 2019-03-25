import React, { Component } from 'react';
import axios from 'axios';
import { getJwt } from '../helpers/jwt'

const initialState = {
    login: "",
    password: "",
    passwordAgain: "",
    teacherKey: "",
    teacherAuthWarning: "",
    teacherAuthSuccess: "",
    loginError: "",
    passwordError: "",
    passwordAgainError: "",
    registerDone: ""
}

export class Register extends Component {
    componentDidMount() {
        const jwt = getJwt();
        if (jwt) {
            this.props.history.push("/account");
        }
    }
    state = initialState;
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleRedirect = (e) => {
        this.props.history.push("/login");
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let validation = false;
        if (this.state.login !== "" && this.state.login.length >= 5) {
            this.setState({
                passwordError: "",
            })
        }
        if (this.state.password !== "" && this.state.password.length >= 5) {
            this.setState({
                passwordError: "",
            })
        }
        if (this.state.login === "") {
            this.setState({
                loginError: "Login cannot be empty!"
            })
        }
        if (this.state.password === "") {
            this.setState({
                passwordError: "Password cannot be empty!"
            })
        }
        if (this.state.passwordAgain === this.state.password) {
            this.setState({
                passwordAgainError: "",
            })
        }
        if (this.state.login.length < 5) {
            this.setState({
                loginError: "Login should be at least 5 characters long!"
            })
        }
        if (this.state.password.length < 5) {
            this.setState({
                passwordError: "Password should be at least 5 characters long!"
            })
        }
        if (this.state.passwordAgain !== this.state.password) {
            this.setState({
                passwordAgainError: "Passwords do not matches!"
            })
        }
        if (this.state.login !== "" && this.state.login.length >= 5 && this.state.password !== "" && this.state.password.length >= 5 && this.state.passwordAgain === this.state.password) {
            validation = true;
            this.setState({
                loginError: "",
                passwordError: "",
                passwordAgainError: "",
            })
        }
        if (validation) {
            axios.post("/users/register", {
                login: this.state.login,
                password: this.state.password,
                teacherKey: this.state.teacherKey
            }).then(response => {
                if (!response.data.done) {
                    this.setState({
                        initialState,
                        loginError: response.data.msg
                    })
                }
                if (response.data.done) {
                    this.setState({
                        initialState,
                        registerDone: response.data.msg,
                        teacherAuthWarning: response.data.teacherAuthWarning,
                        teacherAuthSuccess: response.data.teacherAuthSuccess
                    })
                    setTimeout(() => {
                        this.props.history.push("/login");
                    }, 1000);
                }
            });
        }
    }
    render() {
        return (
            <div className="register flexfullwh">
                <form className="register-form center" onSubmit={this.handleSubmit}>
                    <input id="login" name="login" placeholder="Type your login" type="text" onChange={this.handleChange} /> <br />
                    <div className="error">{this.state.loginError}</div>
                    <input id="password" name="password" placeholder="Type your password" type="password" onChange={this.handleChange} /> <br />
                    <div className="error">{this.state.passwordError}</div>
                    <input id="passwordAgain" name="passwordAgain" placeholder="Type your password again" type="password" onChange={this.handleChange} /> <br />
                    <div className="error">{this.state.passwordAgainError}</div>
                    <input id="teacherKey" name="teacherKey" placeholder="Type teacher registration key" type="password" onChange={this.handleChange} /> <br />
                    <div className="warning">{this.state.teacherAuthWarning}</div>
                    <div className="success">{this.state.teacherAuthSuccess}</div>
                    <button type="submit">Register</button> <br />
                    <div className="success">{this.state.registerDone}</div>
                    <a href="/login">Have already account? Log in!</a>
                </form>
            </div>
        )
    }
}

export default Register
