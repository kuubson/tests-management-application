import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = (props) => {
    return (
        <div className="center">
            <form className="form-group" onSubmit={props.handleSubmit}>
                <input id="login" className="form-control" name="login" placeholder="Type your login..." type="text" onChange={props.handleChange} /> <br />
                {props.errorLOGIN && <div className="alert alert-danger">{props.errorLOGIN}</div>}
                <input id="password" className="form-control" name="password" placeholder="Type your password..." type="password" onChange={props.handleChange} /> <br />
                {props.errorPASSWORD && <div className="alert alert-danger">{props.errorPASSWORD}</div>}
                {props.error && <div className="alert alert-warning">{props.error}</div>}
                {props.success && <div className="alert alert-success">{props.success}</div>}
                <button type="submit" className="btn btn-dark">Login</button> <br />
                <Link className="text-uppercase" to="/register">Do not have account? Register now!</Link>
            </form>
        </div>
    )
}

export default LoginForm
