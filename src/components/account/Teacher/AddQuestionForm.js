import React, { Component } from 'react'
import Back from '../Buttons/Back'
import Logout from '../Buttons/Logout'

export class Add extends Component {
    render() {
        return (
            <div className="menu">
                <div className="menu-list">
                    <ul className="menu-items">
                        <div className="buttons">
                            <li><Logout /></li>
                            <li><Back where="/account" /></li>
                        </div>
                    </ul>
                </div>
                <div className="center">
                    <div className="mainform">
                        <form className="form-group" onSubmit={this.props.handleSubmit}>
                            <input id="body" className="form-control mt-3" name="body" placeholder="Type your question..." type="text" onChange={this.props.handleChange} /> <br />
                            {this.props.errorBODY && <div className="alert alert-danger">{this.props.errorBODY}</div>}
                            <input id="answerA" className="form-control" name="answerA" placeholder="Give answer A..." type="text" onChange={this.props.handleChange} /> <br />
                            {this.props.errorANSWER_A && <div className="alert alert-danger">{this.props.errorANSWER_A}</div>}
                            <input id="answerB" className="form-control" name="answerB" placeholder="Give answer B..." type="text" onChange={this.props.handleChange} /> <br />
                            {this.props.errorANSWER_B && <div className="alert alert-danger">{this.props.errorANSWER_B}</div>}
                            <input id="answerC" className="form-control" name="answerC" placeholder="Give answer C..." type="text" onChange={this.props.handleChange} /> <br />
                            {this.props.errorANSWER_C && <div className="alert alert-danger">{this.props.errorANSWER_C}</div>}
                            <input id="answerD" className="form-control" name="answerD" placeholder="Give answer D..." type="text" onChange={this.props.handleChange} /> <br />
                            {this.props.errorANSWER_D && <div className="alert alert-danger">{this.props.errorANSWER_D}</div>}
                            <select className="form-control" onChange={this.props.handleSelectChange} name="properAnswer">
                                <option hidden>Choose proper answer...</option>
                                <option name="category" value="A">A</option>
                                <option name="category" value="B">B</option>
                                <option name="category" value="C">C</option>
                                <option name="category" value="D">D</option>
                            </select> <br />
                            {this.props.errorANSWER_PROPER && <div className="alert alert-danger">{this.props.errorANSWER_PROPER}</div>}
                            <select className="form-control" onChange={this.props.handleSelectChange} name="category">
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
                            <input name="myImage" type="file" className="form-control-file" onChange={this.props.handleFileChange} style={{ marginBottom: '-15px', marginTop: '20px' }} /> <br /> <br />
                            <button type="submit" className="btn btn-dark submit">Submit</button> <br />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Add
