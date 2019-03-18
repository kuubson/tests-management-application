import React, { Component } from 'react'
import { getJwt } from '../helpers/jwt'

export class WelcomePage extends Component {
    componentDidMount() {
        const jwt = getJwt();
        if (jwt) {
            this.props.history.push('/account');
        }
    }
    handleLoginButton = () => {
        this.props.history.push('/login');
    }
    handleRegisterButton = () => {
        this.props.history.push('/register');
    }
    render() {
        return (
            <div className="home flexfullwh">
                <div className="center">
                    <h1>Welcome to Tests Management Application</h1>
                    <button onClick={this.handleLoginButton}>Login</button>
                    <button onClick={this.handleRegisterButton}>Register</button>
                </div>
            </div>
        )
    }
}

export default WelcomePage
