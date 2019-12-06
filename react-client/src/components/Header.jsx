import React from 'react';
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component {
	constructor(props) {
    super(props);
    this.state = { 
      session: false
    }
  }

    render(){
    	if(this.props.session){
    		return(
	<nav className="navbar navbar-light navbar-fixed-top" style={{"backgroundColor":"#e3f2fd"}}>
  <div >
		<ul id='HNA'>
		<li id='Na'><NavLink to = "/" activeClassName = "is-active" exact = {true}>Home</NavLink></li>
		<li id='Na'><NavLink to = "/jobsForm" activeClassName = "is-active" >Add Job</NavLink></li>
		<li id='Na'><NavLink to = "/profile" activeClassName = "is-active" >Profile</NavLink></li>
		<li className="nav navbar-nav pull-right" id='Na'><NavLink to = "/logout" activeClassName = "is-active" >Logout</NavLink></li>
		</ul>
	 </div>
</nav>
	);
    	}else{
    		return(
	<nav className="navbar navbar-light navbar-fixed-top" style={{"backgroundColor":"#e3f2fd"}}>
  <div >
		<ul id='HNA'>
		<li id='Na'><NavLink to = "/" activeClassName = "is-active" exact = {true}>Home</NavLink></li>
		<li className="pull-right" id='Na'><NavLink to = "/login" activeClassName = "is-active" >Login</NavLink></li>
		<li className="pull-right" id='Na'><NavLink to = "/signup" activeClassName = "is-active" >Sign up</NavLink></li>
		</ul>
	 </div>
</nav>
	);
    	}
        
 }
}
export default NavBar;
 