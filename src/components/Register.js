import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

export class Register extends Component {
    state = {
        loginError: "",
        passwordError: "",
        passwordAgainError: "",
        registerDone: ""
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let inputLogin = $("#login").val();
        let inputPassword = $("#password").val();
        let inputPasswordAgain = $("#passwordAgain").val();
        let validation = false;
        if (inputLogin !== "" && inputLogin.length >= 5) {
            this.setState({
                passwordError: "",
            })
        }
        if (inputPassword !== "" && inputPassword.length >= 5) {
            this.setState({
                passwordError: "",
            })
        }
        if (inputPasswordAgain === inputPassword) {
            this.setState({
                passwordAgainError: "",
            })
        }
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
        if (inputLogin.length < 5) {
            this.setState({
                loginError: "Login should be at least 5 characters long!"
            })
        }
        if (inputPassword.length < 5) {
            this.setState({
                passwordError: "Password should be at least 5 characters long!"
            })
        }
        if (inputPasswordAgain !== inputPassword) {
            this.setState({
                passwordAgainError: "Passwords do not matches!"
            })
        }
        if (inputLogin !== "" && inputLogin.length >= 5 && inputPassword !== "" && inputPassword.length >= 5 && inputPasswordAgain === inputPassword) {
            validation = true;
            this.setState({
                loginError: "",
                passwordError: "",
                passwordAgainError: ""
            })
        }
        if (validation) {
            axios.post('/users/register', {
                login: inputLogin,
                password: inputPassword
            }).then(response => {
                if (response.data === false) {
                    this.setState({
                        loginError: "This login is already taken!"
                    })
                }
                if (response.data === false) {
                    this.setState({
                        registerDone: "Account created!"
                    })
                }
            });
        }
    }
    render() {
        return (
            <div className="register flexfullwh">
                <form className="register-form center">
                    <input id="login" name="login" placeholder="Type your login" type="text" /> <br />
                    <div className="error">{this.state.loginError}</div>
                    <input id="password" name="password" placeholder="Type your password" type="password" /> <br />
                    <div className="error">{this.state.passwordError}</div>
                    <input id="passwordAgain" name="passwordAgain" placeholder="Type your password again" type="password" /> <br />
                    <div className="error">{this.state.passwordAgainError}</div>
                    <button type="submit" onClick={this.handleSubmit}>Log in</button> <br />
                    <div className="success">{this.state.registerDone}</div>
                    <a href="/">Have already account? Log in!</a>
                </form>
            </div>
        )
    }
}

export default Register
