import React, { Component } from 'react'
import { printToPdf } from '../../../helpers/printToPdf'
import { clearString } from '../../../helpers/clearString'

export class Print extends Component {
    print = () => {
        printToPdf(this.props.questions, clearString);
    }
    render() {
        return (
            <button className="btn btn-dark" onClick={this.print}>Print to PDF</button>
        )
    }
}

export default Print
