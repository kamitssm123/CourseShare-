import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import StudentSignUp from './screens/studentSignup';
import StudentDashboard from "./screens/studentDashboard";
import TeacherSignUp from './screens/teacherSignup';
import TeacherDashboard from "./screens/teacherDashboard";
import CourseInfo from './screens/course';
import Error from './screens/error';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import './css/style.css'

class App extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/studentSignup" component={StudentSignUp} />
                        <Route exact path="/studentDashboard" component={StudentDashboard} />
                        <Route exact path="/course" component={CourseInfo} />
                        <Route exact path="/teacherSignup" component={TeacherSignUp} />
                        <Route exact path="/teacherDashboard" component={TeacherDashboard} />
                        <Route component={Error} />
                    </Switch>
                </BrowserRouter>
                <ToastContainer 
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={true}
                    pauseOnHover={true}
                    draggable={true}
                />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
