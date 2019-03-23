import React, { Component } from 'react'
import axios from 'axios'
import { getJwt } from '../helpers/jwt'
import { withRouter } from 'react-router-dom'

export class Login extends Component {
    componentDidMount() {
        const jwt = getJwt();
        if (jwt) {
            this.props.history.push('/account');
        }
        this.props.socket.on('warning', msg => {
            this.setState({
                logginingSuccess: "",
                logginingError: msg
            })
        })
    }
    state = {
        login: "",
        password: "",
        loginError: "",
        passwordError: "",
        logginingError: "",
        logginingSuccess: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let validation = false;
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
        if (this.state.login !== "" && this.state.password !== "") {
            validation = true;
        }
        if (validation) {
            this.setState({
                loginError: "",
                passwordError: "",
                logginingError: ""
            })
            axios.post("/users/login", {
                login: this.state.login,
                password: this.state.password
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
                    }, 1000);
                }
            });
        }
    }
    render() {
        return (
            <div className="login flexfullwh">
                <form className="login-form center" onSubmit={this.handleSubmit}>
                    <input id="login" name="login" placeholder="Type your login" type="text" onChange={this.handleChange} /> <br />
                    <div className="error">{this.state.loginError}</div>
                    <input id="password" name="password" placeholder="Type your password" type="password" onChange={this.handleChange} /> <br />
                    <div className="error">{this.state.passwordError}</div>
                    <button type="submit">Log in</button> <br />
                    <div className="error">{this.state.logginingError}</div>
                    <div className="success">{this.state.logginingSuccess}</div>
                    <a href="/register">Do not have account? Register it!</a>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)
