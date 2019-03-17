import React, { Component } from 'react'
import $ from "jquery"
import axios from 'axios'
import { getJwt } from '../helpers/jwt'

export class Login extends Component {
    componentDidMount() {
        const jwt = getJwt();
        if (jwt) {
            this.props.history.push('/account');
        }
    }
    state = {
        loginError: "",
        passwordError: "",
        logginingError: "",
        logginingSuccess: ""
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let inputLogin = $("#login").val();
        let inputPassword = $("#password").val();
        let validation = false;
        if (inputLogin === "") {
            this.setState({
                loginError: "Login cannot be empty!"
            })
        }
        if (inputPassword === "") {
            this.setState({
                passwordError: "Password cannot be empty!"
            })
        }
        if (inputLogin !== "" && inputPassword !== "") {
            validation = true;
        }
        if (validation) {
            this.setState({
                loginError: "",
                passwordError: "",
                logginingError: ""
            })
            axios.post("/users/login", {
                login: inputLogin,
                password: inputPassword
            }).then(response => {
                if (!response.data.done) {
                    this.setState({
                        logginingError: response.data.msg
                    })
                }
                if (response.data.done) {
                    this.setState({
                        logginingSuccess: response.data.msg
                    })
                    sessionStorage.setItem('jwt', response.data.token);
                    setTimeout(() => {
                        this.props.history.push("/account");
                    }, 3000);
                }
            });
        }
    }
    render() {
        return (
            <div className="login flexfullwh">
                <form className="login-form center">
                    <input id="login" name="login" placeholder="Type your login" type="text" /> <br />
                    <div className="error">{this.state.loginError}</div>
                    <input id="password" name="password" placeholder="Type your password" type="password" /> <br />
                    <div className="error">{this.state.passwordError}</div>
                    <button type="submit" onClick={this.handleSubmit}>Log in</button> <br />
                    <div className="error">{this.state.logginingError}</div>
                    <div className="success">{this.state.logginingSuccess}</div>
                    <a href="/register">Do not have account? Register it!</a>
                </form>
            </div>
        )
    }
}

export default Login
