import React, { Component } from 'react'
import io from 'socket.io-client'
import StudentHome from './StudentHome';

export class Student extends Component {
    state = {
        socket: "",
    }
    componentWillMount() {
        const socket = io('http://127.0.0.1:3001/student');
        this.setState({ socket });
    }
    componentDidMount() {
        this.state.socket.emit('login', {
            login: this.props.login,
            type: this.props.type
        })
    }
    componentWillUnmount() {
        this.state.socket.emit('logout', {
            login: this.props.login,
            type: this.props.type
        })
    }
    render() {
        return (
            <div className="student flexfullwh">
                <StudentHome socket={this.state.socket} login={this.props.login} />
            </div>
        )
    }
}

export default Student
