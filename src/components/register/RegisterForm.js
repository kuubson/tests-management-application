import React from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = (props) => {
    return (
        <div className="center">
            <form className="form-group" onSubmit={props.handleSubmit}>
                <input id="login" className="form-control" name="login" placeholder="Type your login..." type="text" onChange={props.handleChange} /> <br />
                {props.errorLOGIN && <div className="alert alert-danger">{props.errorLOGIN}</div>}
                <input id="password" className="form-control" name="password" placeholder="Type your password..." type="password" onChange={props.handleChange} /> <br />
                {props.errorPASSWORD && <div className="alert alert-danger">{props.errorPASSWORD}</div>}
                <input id="password2" className="form-control" name="password2" placeholder="Type your password again..." type="password" onChange={props.handleChange} /> <br />
                {props.errorPASSWORD2 && <div className="alert alert-danger">{props.errorPASSWORD2}</div>}
                <select className="form-control" onChange={props.handleSelectChange}>
                    <option hidden>Choose account type...</option>
                    <option name="type" value="student">Student</option>
                    <option name="type" value="blind-student">Blind-Student</option>
                    <option name="type" value="blind-student">Sand-Blind-Student</option>
                    <option name="type" value="teacher">Teacher</option>
                </select> <br />
                {props.errorTYPE && <div className="alert alert-danger">{props.errorTYPE}</div>}
                <input id="userKey" className="form-control" name="userKey" placeholder="Type user key..." type="password" onChange={props.handleChange} /> <br />
                {props.errorUSERKEY && <div className="alert alert-danger">{props.errorUSERKEY}</div>}
                {props.error && <div className="alert alert-warning">{props.error}</div>}
                {props.success && <div className="alert alert-success">{props.success}</div>}
                <button type="submit" className="btn btn-dark">Register</button> <br />
                <Link className="text-uppercase" to="/">Have already account? Log in!</Link>
            </form>
        </div>
    )
}

export default RegisterForm
