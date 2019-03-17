import React, { Component } from 'react'
import $ from "jquery";

export class Login extends Component {
    state = {
        loginError: "",
        passwordError: ""
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let inputLogin = $("#login").val();
        let inputPassword = $("#password").val();
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
                    <a href="/register">Do not have account? Register it!</a>
                </form>
            </div>
        )
    }
}

export default Login
