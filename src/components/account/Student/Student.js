import React, { Component } from 'react'
import StudentHome from './StudentHome'
import io from 'socket.io-client'

export class Student extends Component {
    state = {
        socket: ""
    }
    componentWillMount() {
        const socket = io('http://localhost:3001/student');
        this.setState({ socket });
    }
    componentDidMount() {
        this.state.socket.emit('login', {
            login: this.props.login,
            type: this.props.type
        })
        this.state.socket.on('sendTest', (test) => {
            console.log(test);
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
                <StudentHome />
            </div>
        )
    }
}

export default Student
