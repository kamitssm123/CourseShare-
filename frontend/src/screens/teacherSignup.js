import React, { Component } from "react";
import $ from 'jquery';
import { toast } from "react-toastify";
import teacherImage from '../images/teacher.png';
import { Link } from "react-router-dom";

const api = 'http://localhost:9000';

export default class TeacherSignUp extends Component {
    state = {
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: '',
        loginEmail: '',
        loginPassword: '',

        checkEmail: 0,

        loaded: false,
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
                    this.props.history.push('/teacherDashboard');
                }
                else {
                    this.setState({loaded: true});
                }
            })
        }
        else {
            this.setState({loaded: true});
        }
    }

    mounted = () => {
        if(this.state.loaded) {
            var Password = document.getElementById("password");
            var ConfirmPassword = document.getElementById("confirmPassword");
            Password.onchange = Confirm;
            ConfirmPassword.onchange = Confirm;
            function Confirm() {
                ConfirmPassword.setCustomValidity("");
                if (Password.value !== ConfirmPassword.value) {
                    ConfirmPassword.setCustomValidity("Passwords do not match.");
                }
            }
        }
    }

    componentDidMount() {
        this.mounted();
    }

    componentDidUpdate() {
        this.mounted();
    }

    isEmail = () => {
        var email = document.getElementById('email')
        if(email.checkValidity()) {
            fetch(api+'/login/teacherIsEmail', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: this.state.signupEmail})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'available') {
                    $('#emailCheck2').hide();
                    $('#emailCheck').show();
                    $('#emailCheck').attr('title', 'Email available');
                    this.setState({checkEmail: 1});
                }
                else {
                    $('#emailCheck').hide();
                    $('#emailCheck2').show();
                    $('#emailCheck2').attr('title', 'Email already exists');
                    this.setState({checkEmail: 0});
                }
            })
        }
        else {
            $('#emailCheck').hide();
            $('#emailCheck2').show();
            $('#emailCheck2').attr('title', 'Please match the requested format');
        }
    }

    signupSubmitHandler = (e) => {
        e.preventDefault();
        if(this.state.checkEmail) {
            $('.register-button').attr('disabled', 'true');
            $('.register-button').css('opacity', '0.7');
            var user = {
                name: this.state.signupName,
                email: this.state.signupEmail,
                password: this.state.signupPassword
            }
            fetch(api+'/login/teacherSignup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                $('.register-button').removeAttr('disabled');
                $('.register-button').css('opacity', '1');
                if(data.status === 'success') {
                    toast.info('✔ Account created successfully');
                }
                else {
                    toast.info('✖ An error occurred');                    
                }
                this.setState({signupName: '', signupEmail: '', signupPassword: '', signupConfirmPassword: '', checkEmail: 0});   
                $('#emailCheck').hide();
                $('#emailCheck2').hide();                 
            })
        }
    }


    loginSubmitHandler = (e) => {
        e.preventDefault();
        $('.login-button').attr('disabled', 'true');
        $('.login-button').css('opacity', '0.7');
        fetch(api+'/login/teacherLogin', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.loginEmail, password: this.state.loginPassword})
        })
        .then(res => res.json())
        .then(data => {
            $('.login-button').removeAttr('disabled');
            $('.login-button').css('opacity', '1');
            if(data.status === 'success') {
                localStorage.setItem('teacherToken', data.token);
                this.props.history.push('/teacherDashboard');
            }
            else {
                toast.info('✖ Invalid Credentials');
                this.setState({loginEmail: '', loginPassword: ''});
            }
        })
    }

    render() {
        return (this.state.loaded) ? (
            <div className="slide-2 mb-5 pb-4 pt-3">
                <Link to="/"><span className="mx-4" style={{fontSize: 35, fontWeight: 'bold', color: '#e63946'}}>C<span style={{color: '#fff'}}>ourse</span>S<span style={{color: '#fff'}}>hare</span></span></Link>                 
                <div className="page-content">
                    <div className="form-v7-content teacher-page">
                        <div className="form-detail" data-aos="fade-up">
                            <center>
                                <div className="login-signup-row">
                                    <div className="signup-head head-active noselect" onClick={() => {
                                        $('.page-login').fadeOut('fast', () => {
                                            $('.page-signup').fadeIn('fast');
                                        });
                                        $('.signup-head').addClass('head-active');
                                        $('.login-head').removeClass('head-active');
                                    }}>Sign Up</div>
                                    <div className="login-head noselect" onClick={() => {
                                        $('.page-signup').fadeOut('fast', () => {
                                            $('.page-login').fadeIn('fast');
                                        });
                                        $('.signup-head').removeClass('head-active');
                                        $('.login-head').addClass('head-active');
                                    }}>Login</div>
                                </div>
                            </center>
                            <div className="page-signup">
                                <form onSubmit={this.signupSubmitHandler}>
                                    <div className="form-row">
                                        <label htmlFor="name">NAME</label>
                                        <input type="text" id="name" className="input-text" value={this.state.signupName} onChange={(e) => {this.setState({signupName: e.target.value})}} required />
                                        <span className="fa fa-user-o input-icon-left"></span>
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="email">E-MAIL</label>
                                        <input type="email" id="email" className="input-text" value={this.state.signupEmail} onBlur={this.isEmail} onChange={(e) => {this.setState({signupEmail: e.target.value})}} required />
                                        <span className="fa fa-envelope input-icon-left"></span>
                                        <span className="fa fa-check input-icon-right" id="emailCheck" style={{color: '#1ebd46', display: 'none'}}></span>
                                        <span className="fa fa-times input-icon-right" id="emailCheck2" style={{color: '#d12317', display: 'none'}}></span>
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="password">PASSWORD</label>
                                        <input type="password" id="password" className="input-text" value={this.state.signupPassword} onChange={(e) => {this.setState({signupPassword: e.target.value})}} required />
                                        <span className="fa fa-lock input-icon-left"></span>
                                        <span className="fa fa-eye input-icon-right" id="eye1" onClick={() => {
                                            $('#eye1').toggleClass('fa-eye');
                                            $('#eye1').toggleClass('fa-eye-slash');
                                            var input = $('#password');
                                            if(input.attr('type') === 'password') {
                                                input.attr('type', 'text');
                                            }
                                            else {
                                                input.attr('type', 'password');
                                            }
                                        }}></span>
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                                        <input type="password" id="confirmPassword" className="input-text" value={this.state.signupConfirmPassword} onChange={(e) => {this.setState({signupConfirmPassword: e.target.value})}} required />
                                        <span className="fa fa-lock input-icon-left"></span>
                                        <span className="fa fa-eye input-icon-right" id="eye2" onClick={() => {
                                            $('#eye2').toggleClass('fa-eye');
                                            $('#eye2').toggleClass('fa-eye-slash');
                                            var input = $('#confirmPassword');
                                            if(input.attr('type') === 'password') {
                                                input.attr('type', 'text');
                                            }
                                            else {
                                                input.attr('type', 'password');
                                            }
                                        }}></span>
                                    </div>
                                    <center>
                                    <button type="submit" className="register-button mt-2">Register</button>
                                    </center>
                                    
                                </form>
                                
                                
                            </div>
                            <div className="page-login" style={{display: 'none'}}>
                                <form style={{marginTop: 90}} onSubmit={this.loginSubmitHandler}>
                                    <div className="form-row">
                                        <label htmlFor="emaill">EMAIL</label>
                                        <input type="email" id="emaill" className="input-text" value={this.state.loginEmail} onChange={(e) => {this.setState({loginEmail: e.target.value})}} required />
                                        <span className="fa fa-envelope input-icon-left"></span>
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="passwordl">PASSWORD</label>
                                        <input type="password" id="passwordl" className="input-text" value={this.state.loginPassword} onChange={(e) => {this.setState({loginPassword: e.target.value})}} required />
                                        <span className="fa fa-lock input-icon-left"></span>
                                        <span className="fa fa-eye input-icon-right" id="eye3" onClick={() => {
                                            $('#eye3').toggleClass('fa-eye');
                                            $('#eye3').toggleClass('fa-eye-slash');
                                            var input = $('#passwordl');
                                            if(input.attr('type') === 'password') {
                                                input.attr('type', 'text');
                                            }
                                            else {
                                                input.attr('type', 'password');
                                            }
                                        }}></span>
                                    </div>
                                    
                                    <center>
                                        <button type="submit" className="login-button">Login</button>
                                    </center>
                                    
                                </form>
                            </div>
                        </div>
                        <div className="form-left" data-aos="fade-up" data-aos-delay="200">
                            <h2 className="text-center mt-lg-5 mt-2">Teacher Signup</h2>
                            <center><div className="head-underline"></div></center>
                            <br />
                            <center><img src={teacherImage} alt="teacher" className="signup-img" /></center>
                        </div>
                    </div>
                </div>
            </div>
            
        ) :
        (
            <div id="loader" style={{position:'fixed',left:0,top:0,width:'100%',height:'100%',zIndex:100,background:"url('./loader.svg') center no-repeat"}}></div>
        )
    }
}
