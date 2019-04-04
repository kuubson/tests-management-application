import React, { Component } from 'react'

import Validation from '../../../helpers/Validation'
import axios from 'axios'
import uuidv4 from 'uuid'
import $ from 'jquery'

export class FindResults extends Component {
    _isMounted = false
    state = {
        login: "",
        results: "",
        errorLOGIN: "",
        success: "",
        error: ""
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            login: "",
            results: "",
            errorLOGIN: "",
            success: "",
            error: ""
        })
        $('#login').val('');
    }
    handleSubmit = async (e) => {
        this.setState({
            success: "",
            error: "",
            results: ""
        })
        e.preventDefault();
        const { login } = this.state;
        const validation = Validation.findResultValidation(login);
        this.setState(validation);
        if (validation.isValid) {
            if (this._isMounted) {
                const findingResultProcess = await axios.post('/getResult', {
                    login
                })
                if (findingResultProcess.data.done) {
                    const results = findingResultProcess.data.results.map(result => {
                        return (
                            <div className="foundResult" key={uuidv4()}>
                                <p><b>Student:</b> {result.login}</p>
                                <p><b>Category:</b> {result.category}</p>
                                <p><b>Points:</b> {result.points}/{result.totalPoints} {result.percent}</p>
                                <p><b>Date:</b> {result.date}</p>
                            </div>
                        )
                    })
                    this.setState({
                        results
                    })
                } else {
                    this.setState({ "error": findingResultProcess.data.message, "success": "", results: "" });
                }
            }
        }
    }
    render() {
        return (
            <div className="studentResult result-info">
                <form>
                    <input id="login" className="form-control findResultsInput" name="login" placeholder="Find your student's results..." type="text" onChange={this.handleChange} /> <br />
                    {this.state.errorLOGIN && <div className="alert alert-danger">{this.state.errorLOGIN}</div>}
                    {this.state.error && <div className="alert alert-warning">{this.state.error}</div>}
                    <button className="btn btn-dark mr-1" onClick={this.handleSubmit}>Find</button>
                    <button className="btn btn-dark" onClick={this.handleClick}>Cancel</button>
                    <div>
                        {this.state.results}
                    </div>
                </form>
            </div>
        )
    }
}

export default FindResults
