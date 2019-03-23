import React, { Component } from 'react'
import axios from 'axios'
import { getJwt } from '../helpers/jwt'
import { Teacher } from './Teacher';
import Student from './Student';

export class Account extends Component {
    state = {
        login: "",
        role: ""
    }
    componentDidMount() {
        const jwt = getJwt();
        axios.get("/users/getUser", { headers: { Authorization: `Bearer ${jwt}` } }).then(response => {
            this.setState({
                login: response.data.login,
                role: response.data.role
            })
            sessionStorage.setItem("role", response.data.role);
        })
    }
    render() {
        if (this.state.role === "teacher") {
            this.props.socket.emit('teacherLogged', this.state.login);
            return (
                <Teacher login={this.state.login} role={this.state.role} socket={this.props.socket} />
            )
        }
        if (this.state.role === "student") {
            return (
                <Student login={this.state.login} role={this.state.role} socket={this.props.socket} />
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}

export default Account
