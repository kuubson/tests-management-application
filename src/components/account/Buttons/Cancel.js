import React, { Component } from 'react'

export class Cancel extends Component {
    render() {
        return (
            <button className="cancel btn btn-dark" onClick={this.props.cancel}>Cancel</button>
        )
    }
}

export default Cancel
