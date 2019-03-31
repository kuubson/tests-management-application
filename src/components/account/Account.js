import React, { Component } from 'react'
import axios from 'axios'

import { getJwt } from '../../helpers/getJwt'

import Teacher from './Teacher/Teacher'
import Student from './Student/Student'
import BlindStudent from './BlindStudent/BlindStudent'
import Loading from '../loading/Loading'

export class Account extends Component {
    state = {
        login: "",
        type: ""
    }
    async componentWillMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/')
        } else {
            const gettingUserProcess = await axios.get("/getUser", { headers: { Authorization: `Bearer ${jwt}` } });
            this.setState({
                login: gettingUserProcess.data.login,
                type: gettingUserProcess.data.type
            })
        }
    }
    render() {
        return (
            <div className="account">
                {this.state.type === 'teacher' ? <Teacher login={this.state.login} type={this.state.type} /> : this.state.type === 'student' ? <Student login={this.state.login} type={this.state.type} /> : this.state.type === 'blind-student' ? <BlindStudent login={this.state.login} type={this.state.type} /> : <Loading />}
            </div>
        )
    }
}

export default Account
