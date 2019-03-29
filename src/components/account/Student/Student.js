import React, { Component } from 'react'

import StudentHome from './StudentHome'

export class Student extends Component {
    render() {
        return (
            <div className="student flexfullwh">
                <StudentHome />
            </div>
        )
    }
}

export default Student
