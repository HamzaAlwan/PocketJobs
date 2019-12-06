import React from 'react';
import {browserHistory, Route, Switch, Link, NavLink, BrowserRouter as Router} from 'react-router-dom';
import SignUpForm from '../components/signup.jsx';
import JobsForm from '../components/jobsForm.jsx';
import NavBar from '../components/Header.jsx';
import Login from '../components/login.jsx';
import Home from '../components/Home.jsx';
import Profile from '../components/profile.jsx';
import NotAuthenticatedHome from '../components/NotAuthenticatedHome.jsx';
import UserJobs from '../components/UserJobs.jsx';
import axios from 'axios';
import UsersProfile from '../components/UsersProfile.jsx';
class AppRouter extends React.Component {
constructor(props) {
    super(props);
    this.state = { 
      session: false
    }
   
  }

 componentDidMount() {
axios.get('/logged')
  .then(response => {
    const posts = response.data;
    // console.log(response);
    this.setState({session:posts});
     
  })
  .catch(function (error) {
    console.log(error);
  });
}
  
   render() {

    return (
	<Router history={browserHistory}>
		<div>
			<NavBar session={this.state.session}/><br /><br />
			<Switch>
			<Route  exact path = "/"  component = {Home}/>	
			<Route  path = "/signup" component = {SignUpForm} />
			<Route  path = "/UserJobs/:jobTitle/:userName" component = {UserJobs} />
			<Route path = '/user/:username'	component = {UsersProfile} />			
			<Route  path = "/jobsForm" component = {JobsForm} />
			<Route  path = "/profile" component = {Profile} />			
			<Route  path = "/login"	component = {Login} />	
			<Route  path = "/logout"	component = {NotAuthenticatedHome} />	
			</Switch>
		</div>
	</Router>
	)
}
}
export default AppRouter;