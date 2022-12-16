import React, { Component } from 'react';
import logo from '../images/course-icon.png';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const api = "http://localhost:9000";

export default class CourseCardTeacher extends Component {

    removeCourse = () => {
        confirmAlert({
            title: 'Confirm Remove',
            message: 'Are you sure you want to remove this course? This action cannot be reversed',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    fetch(api+'/courses/removeCourse', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id: this.props.courseId})
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.status==='success') {
                            toast.info('✔ Course removed successfully');
                        }
                        else {
                            toast.info('✖ An error occurred');
                        }
                        this.props.afterRemove();
                    })
                }
              },
              {
                label: 'No'
              }
            ]
        });
    }

    render() {
        return (
            <div className="col-lg-4 col-md-6 my-3">
                
                <div className="course-card-wrapper" style={{minHeight: 140}}>  
                    <div>   
                        <div className="course-topic">{this.props.courseInfo.name}</div>
                        <div className="course-teacher">By: {this.props.courseInfo.teacherName}</div>
                        <img src={logo} className="course-logo" alt="Course Logo" />
                        <hr style={{backgroundColor: '#e63946'}} />                            
                        <div className="course-price" style={{textAlign: 'right'}}>&#8377; {this.props.courseInfo.price}</div>
                        <div className="button-group">
                            <div className="button-group-button" onClick={this.removeCourse}>Remove Course</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}