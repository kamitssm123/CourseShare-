import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {

    render() {
        return (
            <div className="site-wrap px-3 my-5 py-5">
                <div>
                    <div className="text-center mt-5 mx-2" style={{fontSize: '3rem', fontWeight: 'bold', color: '#e63946'}}>C<span style={{color: '#fff'}}>ourse</span>S<span style={{color: '#fff'}}>hare</span></div>                
                    <div className="text-center text-white">A platform where course creators can share their knowledge with registered students...</div>
                    <div className="container mt-5">
                        <div className="continue-as text-white">Continue as:</div>
                        <center>
                            <div className="row my-4" style={{alignItems: 'center'}}>
                                <div className="col-md-6 mt-2 mb-3">
                                    <Link to="/studentSignup">
                                        <div className="select-st">
                                            <span>Student </span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-6 mt-3 mb-2">
                                    <Link to="/teacherSignup">
                                        <div className="select-st">
                                        <span>Teacher </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}