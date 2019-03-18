import React, { Component } from 'react'
import Logout from './Logout';
import axios from 'axios'

export class Teacher extends Component {
    state = {
        numberOfQuestions: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/test/getTest", {
            numberOfQuestions: this.state.numberOfQuestions
        }).then(response => {
            console.log(response.data);
        })
    }
    render() {
        return (
            <div className="teacher flexfullwh">
                <Logout />
                <form className="center" onSubmit={this.handleSubmit}>
                    <input id="numberOfQuestions" name="numberOfQuestions" placeholder="Type how much questions to draw lots" type="text" onChange={this.handleChange} /> <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Teacher
