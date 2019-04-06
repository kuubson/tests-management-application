import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

export class Back extends Component {
    handleClick = (where) => {
        this.props.history.push(where);
    }
    render() {
        return (
            <button className="btn btn-dark" onClick={() => this.handleClick(this.props.where)}>Back</button>
        )
    }
}

export default withRouter(Back)
