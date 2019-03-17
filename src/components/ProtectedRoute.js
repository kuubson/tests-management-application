import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getJwt } from '../helpers/jwt'

export class ProtectedRoute extends Component {
    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(ProtectedRoute)
