import React, { Component } from 'react'
import axios from 'axios'
import Validation from '../../../helpers/Validation'
import TeacherForm from './TeacherForm'
import OrderedTest from './OrderedTest';
import io from 'socket.io-client'

export class Teacher extends Component {
    state = {
        socket: "",
        studentsList: "",
        results: [],
        amount: "",
        category: "",
        questions: "",
        errorAMOUNT: "",
        errorCATEGORY: "",
        error: "",
        success: ""
    }
    componentWillMount() {
        const socket = io('/teacher');
        this.setState({ socket });
    }
    componentDidMount() {
        this.state.socket.emit('login', {
            login: this.props.login,
            type: this.props.type
        })
        this.state.socket.emit('studentsList');
        this.state.socket.on('studentsList', (students, blindStudents) => {
            let studentsList = students.concat(blindStudents);
            function getUnique(arr, comp) {
                const unique = arr
                    .map(e => e[comp])
                    .map((e, i, final) => final.indexOf(e) === i && i)
                    .filter(e => arr[e]).map(e => arr[e]);
                return unique;
            }
            studentsList = getUnique(studentsList, 'login').map(student => {
                return (
                    <li className="student" key={student.id} onClick={() => this.sendTest(student.login, this.state.questions)}>{student.login}</li>
                )
            });
            this.setState({ studentsList });
        })
    }
    componentWillUnmount() {
        this.state.socket.emit('logout', {
            login: this.props.login,
            type: this.props.type
        })
    }
    sendTest = (login, questions) => {
        this.state.socket.emit('sendTest', login, questions);
    }
    setResults = (results) => {
        this.state.results.push(results);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSelectChange = (e) => {
        this.setState({
            category: e.target.value
        })
    }
    cancel = () => {
        this.setState({
            amount: "",
            category: "",
            questions: ""
        })
    }
    update = (questions) => {
        this.setState({
            questions
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { amount, category } = this.state
        const validation = Validation.teacherFormValidation(amount, category);
        this.setState(validation);
        if (validation.isValid) {
            const gettingTestProcess = await axios.post('/getTest', {
                amount,
                category
            })
            gettingTestProcess.data.done ? this.setState({ "questions": gettingTestProcess.data.questions, "error": "", success: "" }) : this.setState({ "error": gettingTestProcess.data.message, "success": "", "questions": "" });
        }
    }
    render() {
        return (
            <div className="teacher flexfullwh">
                {this.state.questions === "" ? <TeacherForm
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleSelectChange={this.handleSelectChange}
                    errorAMOUNT={this.state.errorAMOUNT}
                    errorCATEGORY={this.state.errorCATEGORY}
                    error={this.state.error}
                    success={this.state.success}
                    login={this.props.login}
                /> : <OrderedTest socket={this.state.socket} login={this.props.login} setResults={this.setResults} results={this.state.results} questions={this.state.questions} studentsList={this.state.studentsList} sendTest={this.sendTest} cancel={this.cancel} update={this.update} />}
            </div>
        )
    }
}

export default Teacher
