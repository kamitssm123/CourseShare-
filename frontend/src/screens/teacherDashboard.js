import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CourseCardTeacher from '../components/courseCardTeacher';
import { toast } from "react-toastify";

const api = "http://localhost:9000";

export default class TeacherDashboard extends Component {

    state = {
        loaded: false,
        id: '',
        name: '',
        myCourses: [],
        flag: false,

        courseName: '',
        coursePrice: '',
        courseDescription: ''
    }

    getMyCourses = () => {
        fetch(api+'/courses/getMyCourses', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({teacherId: this.state.id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status==='success') {
                this.setState({myCourses: data.myCourses, flag: true});
            }
            else {
                this.setState({flag: false});
            }
        })
    }

    componentWillMount() {
        var token = localStorage.getItem('teacherToken');
        if(token) {
            fetch(api+'/login/teacherCheckTokenStatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    this.setState({loaded: true, id: data.info.id, name: data.info.name});
                    this.getMyCourses();
                }
                else {
                    this.props.history.push('/teacherSignup');
                }
            })
        }
        else {
            this.props.history.push('/teacherSignup');
        }
          
    }

    addCourse = (e) => {
        e.preventDefault();
        var course = {
            name: this.state.courseName,
            price: this.state.coursePrice,
            description: this.state.courseDescription,
            teacherId: this.state.id,
            teacherName: this.state.name
        }
        fetch(api+'/courses/addCourse', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(course)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({courseName: '', coursePrice: '', courseDescription: ''});
            if(data.status==='success') {                
                toast.info('✔ Course added successfully');
            }
            else {
                toast.info('✖ An error occurred');
            }
            this.getMyCourses();
        })
    }

    logout = () => {
        var token = localStorage.getItem('teacherToken');
        fetch(api+'/login/teacherLogout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                localStorage.removeItem('teacherToken');
                this.props.history.push('/teacherSignup');
            }
            else {
                alert('An error occurred');
            }
        })
    }

    render() {

        const CourseList = this.state.myCourses.map(item => {
            return (
                <CourseCardTeacher key={item.id} courseInfo={item} courseId={item.id} afterRemove={this.getMyCourses} />
            )
        });
        
        return (this.state.loaded) ? (
            <section className="pb-5">
                <div className="my-4 mx-3 mx-md-4 d-flex" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link to="/"><div style={{fontSize: 35, fontWeight: 'bold', color: '#e63946', lineHeight: 1}}>C<span style={{color: '#fff'}}>ourse</span>S<span style={{color: '#fff'}}>hare</span></div></Link>
                    <div onClick={this.logout} className="btn logout-button">Logout</div>
                </div>
                <div className="container my-5 pt-2">
                    <Tabs>
                        <TabList>
                            <Tab>My courses</Tab>
                            <Tab>Add course</Tab>
                        </TabList>
                    
                        <TabPanel>
                            {
                                (this.state.flag) ? (
                                    <div className="row justify-content-center mt-5" style={{alignItems: 'center'}}>
                                        {CourseList}
                                    </div>
                                ) : (
                                    <div className="mt-5">
                                        <div className="px-2 text-center"><span className="fa fa-smile-o no-result-icon"></span></div>
                                        <div style={{fontSize: 22, fontWeight: 700, textAlign: 'center', color: '#fff'}} className="px-2">No courses added yet</div>
                                        <div style={{textAlign: 'center', color: '#fff'}} className="px-2">Add courses now to share your knowledge with others...</div>
                                    </div>
                                )
                            }
                            
                        </TabPanel>
                        <TabPanel>                            
                            <form onSubmit={this.addCourse}>
                                <div className="container mt-5">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-8">
                                            <div style={{position: 'relative'}}>
                                                <label htmlFor="course-name" className="new-course-label">Course Name <span style={{color: '#e63946'}}>*</span></label>
                                                <input 
                                                    type="text"
                                                    placeholder="ex: Data Structures in Java" 
                                                    id="course-name" 
                                                    className="new-course-input" 
                                                    required  
                                                    value={this.state.courseName}
                                                    onChange={(e) => this.setState({courseName: e.target.value})}                                               
                                                />
                                                <span className="fa fa-file course-input-icon"></span>
                                            </div>
                                            <div style={{position: 'relative'}}>
                                                <label htmlFor="course-price" className="new-course-label">Course Price <span style={{color: '#e63946'}}>*</span></label>
                                                <input 
                                                    type="tel" 
                                                    placeholder="ex: 3000" 
                                                    id="course-price" 
                                                    className="new-course-input" 
                                                    pattern="^[0-9]*$" 
                                                    required
                                                    value={this.state.coursePrice}
                                                    onChange={(e) => this.setState({coursePrice: e.target.value})}
                                                />
                                                <span className="fa fa-inr course-input-icon"></span>
                                            </div>
                                            <div style={{position: 'relative'}}>
                                                <label htmlFor="course-des" className="new-course-label">Course Description <span style={{color: '#e63946'}}>*</span></label>
                                                <textarea
                                                    placeholder="ex: This is the course description" 
                                                    id="course-des" 
                                                    className="new-course-input course-description" 
                                                    required
                                                    value={this.state.courseDescription}
                                                    onChange={(e) => this.setState({courseDescription: e.target.value})}
                                                >                                            
                                                </textarea>
                                                <span className="fa fa-file-text course-input-icon"></span>
                                            </div>
                                            <button type="submit" className="btn add-course-btn">Add Course</button>
                                        </div>
                                    </div>
                                </div>
                            </form>                            
                        </TabPanel>
                    </Tabs>
                </div>
            </section>
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.svg') center no-repeat"}}></div>
        )
    }
}