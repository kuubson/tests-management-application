import React, { Component } from 'react'
import Logout from '../Buttons/Logout'
import Add from '../Buttons/Add';
import FindResults from '../Buttons/FindResults';

export class TeacherForm extends Component {
    render() {
        return (
            <div className="menu">
                <div className="menu-list">
                    <ul className="menu-items">
                        <div className="buttons">
                            <div className="welcome">
                                Welcome {this.props.login}
                            </div>
                            <li><Logout /></li>
                            <li><Add /></li>
                            <li><FindResults /></li>
                        </div>
                    </ul>
                </div>
                <div className="center">
                    <form className="form-group" onSubmit={this.props.handleSubmit}>
                        <input id="amount" className="form-control" name="amount" placeholder="How many questions you want to generate..." type="text" onChange={this.props.handleChange} /> <br />
                        {this.props.errorAMOUNT && <div className="alert alert-danger">{this.props.errorAMOUNT}</div>}
                        <select className="form-control" onChange={this.props.handleSelectChange}>
                            <option hidden>Choose category...</option>
                            <option name="category" value="EE14">EE14</option>
                            <option name="category" value="EE13">EE13</option>
                            <option name="category" value="EE12">EE12</option>
                            <option name="category" value="EE09">EE09</option>
                            <option name="category" value="EE08">EE08</option>
                        </select> <br />
                        {this.props.errorCATEGORY && <div className="alert alert-danger">{this.props.errorCATEGORY}</div>}
                        {this.props.error && <div className="alert alert-warning">{this.props.error}</div>}
                        {this.props.success && <div className="alert alert-success">{this.props.success}</div>}
                        <button type="submit" className="btn btn-dark">Submit</button> <br />
                    </form>
                </div>
            </div>
        )
    }
}

export default TeacherForm
