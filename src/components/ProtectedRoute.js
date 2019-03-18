import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getJwt } from '../helpers/jwt'

export class ProtectedRoute extends Component {
    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push("/login");
        }
    }
    render() {
        return (
            <div className="flexfullwh">
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(ProtectedRoute)
