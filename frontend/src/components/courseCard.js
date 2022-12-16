import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/course-icon.png';

export default class CourseCard extends Component {

    render() {
        return (
            <div className="col-lg-4 col-md-6 my-3">
                <Link to={`/course?id=${this.props.courseId}`} target="_blank">
                    <div className="course-card-wrapper">  
                        <div>                            
                            <div className="course-topic">{this.props.courseInfo.name}</div>
                            <div className="course-teacher">By: {this.props.courseInfo.teacherName}</div>
                            <img src={logo} className="course-logo" alt="Course Logo" />
                            <hr style={{backgroundColor: '#e63946'}} />                            
                            <div className="course-price" style={{textAlign: 'right'}}>&#8377; {this.props.courseInfo.price}</div>                            
                            
                            <div className="button-group">
                                <div className="button-group-button">Enroll Now</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}