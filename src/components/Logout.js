import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class Logout extends Component {
    handleClick = (e) => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('role');
        this.props.socket.emit('logout');
        this.props.history.push('/login');
    }
    render() {
        return (
            <button className="logout" onClick={this.handleClick}>Logout</button>
        )
    }
}

export default withRouter(Logout)

