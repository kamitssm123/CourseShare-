import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Error extends Component {
    render() {
        return (
            <section className="pt-3">
                <Link to="/"><span className="mx-4" style={{fontSize: 35, fontWeight: 'bold', color: '#e63946'}}>C<span style={{color: '#fff'}}>ourse</span>S<span style={{color: '#fff'}}>hare</span></span></Link>
                <div className="container mt-5 pt-4">
                    <center><div className="px-2 text-center"><span className="fa fa-frown-o no-result-icon"></span></div></center>
                    <h1 className="text-center text-white" style={{fontWeight: 'bold'}}>Error 404</h1>
                    <h5 className="text-center text-white">The page you are looking for does not exist</h5>
                </div>
            </section>
        )
    }
}