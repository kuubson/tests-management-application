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
            return (
                <Teacher />
            )
        }
        if (this.state.role === "student") {
            return (
                <Student />
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
