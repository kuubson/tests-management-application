import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class Add extends Component {
    handleClick = () => {
        this.props.history.push('/add');
    }
    render() {
        return (
            <button className="btn btn-dark" onClick={this.handleClick}>Add question</button>
        )
    }
}

export default withRouter(Add)
