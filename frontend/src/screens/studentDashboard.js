import React, { Component } from "react";
import $ from 'jquery';
import { Link } from "react-router-dom";
import Sort from '../components/sort';
import CourseCard from '../components/courseCard';

const api = "http://localhost:9000";

export default class StudentDashboard extends Component {

    state = {
        loaded: false,
        search: '',
        sortBy: '',
        sortName: 'Default',
        courses: []
    }

    componentWillMount() {
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
                    this.setState({loaded: true});
                }
                else {
                    this.props.history.push('/studentSignup');
                }
            })
        }
        else {
            this.props.history.push('/studentSignup');
        }
    }

    componentDidMount() {
        fetch(api+'/courses/getCourses')
        .then(res => res.json())
        .then(data => {
            this.setState({courses: data});
        })
    }

    selectSort = (e) => {
        $('.sort-active').removeClass('sort-active');
        $(e.target).addClass('sort-active');
        var sortName = e.target.innerHTML;
        this.setState({sortName});
        if(sortName==='Default') this.setState({sortBy: ''});
        else if(sortName==='Price: Low to High') this.setState({sortBy: 'pricel2h'});
        else if(sortName==='Price: High to Low') this.setState({sortBy: 'priceh2l'});
        else if(sortName==='Title: A to Z') this.setState({sortBy: 'titlea2z'});
        else if(sortName==='Title: Z to A') this.setState({sortBy: 'titlez2a'});
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

        const CourseList = this.state.courses.filter(item => {
            var courseName = item.name.toLowerCase();
            var keywords = courseName.split(' ');
            if(this.state.search==='') return true;
            else {
                var search = this.state.search.toLowerCase();
                var searchkey = search.split(' ');
                for(var i=0; i<searchkey.length; i++) {
                    for(var j=0; j<keywords.length; j++) {
                        if(keywords[j].includes(searchkey[i])) {
                            return true;
                        }
                    }
                }
                return false;
            }
        })
        .map(item => {
            return (
                <CourseCard key={item.id} courseInfo={item} courseId={item.id} />
            )
        });
        
        return (this.state.loaded) ? (
            <section className="mb-5 pb-2">
                <div className="mt-4 mx-3 mx-md-4 d-flex" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link to="/"><div style={{fontSize: 35, fontWeight: 'bold', color: '#e63946', lineHeight: 1}}>C<span style={{color: '#fff'}}>ourse</span>S<span style={{color: '#fff'}}>hare</span></div></Link>
                    <div onClick={this.logout} className="btn logout-button">Logout</div>
                </div>
                <div className="container">
                    <h2 className="text-white text-center mt-5">Courses Available</h2>
                    <center><div className="head-underline mb-5"></div></center>
                    <div className="topbar-wrapper mt-4">
                        <div className="course-search-wrapper">
                            <form onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    $('.course-search-input').blur(); 
                                    this.setState({search: $('.course-search-input').val()});
                                    if($('.course-search-input').val()) {
                                        $('.search-results-text').show();
                                    }
                                    else {
                                        $('.search-results-text').hide();
                                    }
                                }
                            }>
                                <input type="text" placeholder="Search..." className="course-search-input" />
                                <button className="fa fa-search"></button>
                            </form>
                        </div>
                        <div className="course-sort-wrapper">
                            <div className="dropdown">
                                <button className="course-sort-main" data-toggle="dropdown">&#8645;&nbsp;&nbsp;Sort - {this.state.sortName}&nbsp;&nbsp;<span className="fa fa-angle-down"></span></button>
                                <button className="course-sort-mobile" data-toggle="dropdown"><span style={{fontWeight: 'bolder'}}>&#8645;</span></button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-item sort-active" onClick={this.selectSort}>Default</div>
                                    <div className="dropdown-item" onClick={this.selectSort}>Price: Low to High</div>
                                    <div className="dropdown-item" onClick={this.selectSort}>Price: High to Low</div>                                    
                                    <div className="dropdown-item" onClick={this.selectSort}>Title: A to Z</div>
                                    <div className="dropdown-item" onClick={this.selectSort}>Title: Z to A</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="search-results-text">Search Results for "{this.state.search}" :</div>
                    <div className="row justify-content-center mb-5" style={{alignItems: 'center'}}>
                        {(this.state.courses.length && CourseList.length) ? <Sort by={this.state.sortBy}>{CourseList}</Sort> : (this.state.courses.length && !CourseList.length) ? <div className="mt-4">
                            <div className="px-2 text-center"><span className="fa fa-frown-o no-result-icon"></span></div>
                            <div style={{fontSize: 22, fontWeight: 700, textAlign: 'center', color: '#fff'}} className="px-2">No results found</div>
                            <div style={{textAlign: 'center', color: '#fff'}} className="px-2">Try using different keywords</div>
                        </div> : <div></div> }
                    </div>
                </div>
            </section>
            
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.svg') center no-repeat"}}></div>
        )
    }
}