import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class Logout extends Component {
    handleClick = (e) => {
        sessionStorage.removeItem('jwt');
        this.props.history.push('/login');
    }
    render() {
        return (
            <div className="logout">
                <button onClick={this.handleClick}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Logout)

