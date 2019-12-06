import React from 'react';
import axios from 'axios';
import { Button, FormControl, Row, Col, ButtonToolbar } from 'react-bootstrap';
import Pmessage from './profilemessage.jsx';
class UserInfo extends React.Component {
   constructor(props) {
    super(props);
    this.state = {states:{
        name:'',
        email: '',
        gender: '',
        phoneNumber: '',
        address: '',
        age: '',
        nationality: ''}

    }
 
    this.onChange = this.onChange.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }
    onChange(e) {
      var states = this.state.states;
      var name = e.target.name;
      var value = e.target.value;
      states[name] = value;
      this.setState({states});

    };
   componentDidMount() {
   	  axios.get('/userInfo')
    .then(response => {
    const posts = response.data;
    this.setState({states:posts});
    
  })
  .catch(function (error) {
    console.log(error);
  });
   }

    handleSubmit(event) {
         event.preventDefault();
        axios.put('/updateUser', this.state.states)
          .then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
        });
    };
 
  render() {
    return (
      <div>
        <div id='profileUpdate' className="container wrapper outerBorder"><br />
          <span id="req" className="wrapper">* required</span>
          <form onSubmit = {this.handleSubmit}>
            <Row>
      		    <Col md={4}>
        	      <label id='signlable'>*Name
        	        <FormControl type="text" name="name" placeholder="Name" autoFocus required
        	        onChange = {this.onChange} value={this.state.states.name}
        	        />
        	      </label>
            	</Col>
        	    <Col md={4}>
                <label id='signlable'>*Phone Number 
                  <FormControl type="number" name="phoneNumber" placeholder="Phone Number" required
                  onChange={this.onChange} value={this.state.states.phoneNumber}/>
                </label><br />
  	          </Col>
  		        <Col md={4}>
      	        <label id='signlable'>*Email:
      	          <FormControl type="email" name="email" placeholder="Email" required
      	          onChange={this.onChange}  value={this.state.states.email} /> 
      	        </label><br />
              </Col>
            </Row><br />
            <Row>
            	<Col md={4}>
      	        <label id='signlable'>*Gender
      	          <FormControl type="text" name="gender" placeholder="Gender" required
      	          onChange={this.onChange}  value={this.state.states.gender} />
      	        </label><br />
              </Col>
      		    <Col md={4}>
                <label id='signlable'>Nationality
                  <FormControl type="text" name="nationality" placeholder="Nationality" 
                  onChange={this.onChange} value={this.state.states.nationality} />
                </label><br />
      	      </Col>
            	<Col md={4}>   
      	        <label id='signlable'>Address
      	          <FormControl type="text" name="address" placeholder="Address"
      	          onChange={this.onChange} value={this.state.states.address} />
      	        </label><br />
      	      </Col>
        	  </Row><br />
        	  <Row>
        		  <Col md={4}>    
      	        <label id='signlable'>*Age
      	          <FormControl type="number" name="age" placeholder="Age" required
      	          onChange={this.onChange} value={this.state.states.age}/>
      	        </label><br />
        	    </Col><br /><br /><br />
              <Col md={4}>
              </Col>
              <Col md={2}>   
        	        <Button type = "submit" bsStyle="primary" bsSize="large">Update</Button> 
        		  </Col>
              <Col md={2}>
                <Pmessage username={this.props.username}/>
              </Col>
        	  </Row>
          </form>
  	    </div>
      </div>
    )
  }
}
export default UserInfo;
