import React, { Component } from "react";
import { Link } from 'react-router-dom';

const api="http://localhost:9000";

var courseId;

export default class CourseInfo extends Component {

    state = {
        loaded1: false,
        loaded2: false,

        courseName: '',
        teacherName: '',
        price: '',
        description: ''
    }

    componentWillMount() {
        var urlParams = (window.location.search);
        if(urlParams) {
            var extra = urlParams.slice(0, 4);
            if(extra==='?id=') {
                courseId = Number(urlParams.slice(4));
                //console.log(courseId);
                if(isNaN(courseId)) {
                    this.props.history.push('/studentDashboard');
                }
                fetch(api+'/courses/getCourseInfo', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({courseId})
                })
                .then(res => res.json())
                .then(data => {
                    if(data.status==='success') {
                        this.setState({
                            loaded2: true,
                            courseName: data.courseInfo.name,
                            teacherName: data.courseInfo.teacherName,
                            price: data.courseInfo.price,
                            description: data.courseInfo.description
                        });
                    }
                    else {
                        this.props.history.push('/studentDashboard');
                        //console.log(data);
                    }
                });
            }
            else {
                this.props.history.push('/studentDashboard');
            }
        }
        else {
            this.props.history.push('/studentDashboard');
        }

        var token = localStorage.getItem('token');
        if(token) {
            fetch(api+'/login/checkTokenStatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    this.setState({loaded1: true});
                }
                else {
                    this.props.history.push('/studentSignup');
                }
            });

        }
        else {
            this.props.history.push('/studentSignup');
        }
    }

    logout = () => {
        var token = localStorage.getItem('token');
        fetch(api+'/login/studentLogout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                localStorage.removeItem('token');
                this.props.history.push('/studentSignup');
            }
            else {
                alert('An error occurred');
            }
        })
    }

    render() {
        
        return (this.state.loaded1 && this.state.loaded2) ? (
            <section>
                <div className="mt-4 mx-3 mx-md-4 d-flex" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link to="/"><div style={{fontSize: 35, fontWeight: 'bold', color: '#e63946', lineHeight: 1}}>C<span style={{color: '#fff'}}>ourse</span>S<span style={{color: '#fff'}}>hare</span></div></Link>
                    <div onClick={this.logout} className="btn logout-button">Logout</div>
                </div>
                <div className="container my-5 pt-4">
                    <h1 className="text-white text-center">{this.state.courseName}</h1>
                    <center><div className="head-underline mb-4"></div></center>
                    <h6 className="text-white text-center">Offered by: {this.state.teacherName}</h6>
                    <h6 className="text-white text-center">Price: &#8377; {this.state.price}</h6>
                    <br /><hr style={{backgroundColor: '#fff'}} />
                    <div className="row mt-4" style={{alignItems: 'center'}}>
                        <div className="col-md-3">
                            <h5 className="text-white mb-md-0 mb-3" style={{fontWeight: 'bolder'}}>Course Description:</h5>
                        </div>
                        <div className="col-md-9">
                            <h5 className="text-white mb-0">{this.state.description}</h5>
                        </div>
                    </div>
                    <br /><hr style={{backgroundColor: '#fff'}} />
                    <div className="row mt-4 justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="text-white text-center mb-5" style={{fontSize: 'small'}}>Further, a payment gateway can be added and the registered students can pay the course fee to access the course contents. However, these features are not in scope of the current prototype.</div>
                        </div>
                    </div>                                    
                </div>
            </section>
        ) : (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.svg') center no-repeat"}}></div>
        )
    }
}