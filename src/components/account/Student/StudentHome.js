import React, { Component } from 'react'

import Logout from '../Buttons/Logout'

export class StudentHome extends Component {
    render() {
        return (
            <div className="menu">
                <div className="menu-list">
                    <ul className="menu-items">
                        <div className="buttons">
                            <li><Logout /></li>
                        </div>
                    </ul>
                </div>
                <div className="questions center">
                    <div>Please wait...</div>
                </div>
            </div>
        )
    }
}

export default StudentHome
