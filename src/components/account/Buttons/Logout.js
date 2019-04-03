import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

export class Logout extends Component {
    handleClick = () => {
        sessionStorage.removeItem('jwt');
        this.props.history.push('/');
    }
    render() {
        return (
            <button className="logout btn btn-dark" onClick={this.handleClick}>Logout</button>
        )
    }
}

export default withRouter(Logout)
