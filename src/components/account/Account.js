import React, { Component } from 'react'
import axios from 'axios'

import { getJwt } from '../../helpers/getJwt'

import Teacher from './Teacher/Teacher'
import Student from './Student/Student'
import BlindStudent from './BlindStudent/BlindStudent'
import Loading from '../loading/Loading'

export class Account extends Component {
    _isMounted = false;
    state = {
        login: "",
        type: ""
    }
    async componentDidMount() {
        this._isMounted = true;
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/')
        } else {
            if (this._isMounted) {
                const gettingUserProcess = await axios.get("/getUser", { headers: { Authorization: `Bearer ${jwt}` } });
                this.setState({
                    login: gettingUserProcess.data.login,
                    type: gettingUserProcess.data.type
                })
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        if (this._isMounted) {
            return (
                <div className="account">
                    {this.state.type === 'teacher' ? <Teacher login={this.state.login} type={this.state.type} /> : this.state.type === 'student' ? <Student login={this.state.login} type={this.state.type} /> : this.state.type === 'blind-student' ? <BlindStudent login={this.state.login} type={this.state.type} /> : null}
                </div>
            )
        } else {
            return (
                <Loading />
            )
        }

    }
}

export default Account
