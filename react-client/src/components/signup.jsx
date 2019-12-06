import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Button, FormControl, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';


class SignUpForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {states:{
        name: '',
        userName: '',
        password: '',
        email: '',
        gender: '',
        phoneNumber: '',
        address: '',
        age: '',
        nationality: '',
        image:''},
      message:'',
      messageImg:'Wait till upload complete'
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }
    onChange(e) {
      var states = this.state.states;
      var name = e.target.name;
      var value = e.target.value;
      states[name] = value;
      this.setState({states:states});
    };

    onImageChange(e){
      var states = this.state.states
      var imgReader = new FileReader();
      var img = e.target.files[0];
      var that = this;
      var test = ''
      imgReader.onload = function(upload) {
        test = upload.target.result
        test = test.slice(22)
        $.ajax({
          url: `https://api.imgur.com/3/image`,
          method: 'POST',
          headers: {"Authorization": "Client-ID bb8a64e82b834b5"},
          data:test
        })
        .done (function (data) {
          states['image'] = data.data.link;
          that.setState({
            states: states,
            messageImg:'Upload completed'
          });
        })
        .fail(function( jqXHR, textStatus ) {
          alert("item not found, textStatus");
        });
      };
      imgReader.readAsDataURL(img)
    }

    handleSubmit(event) {
      var that=this;
      event.preventDefault();
      axios.post('/signup', this.state.states)
        .then(function (response) {
          that.setState({message:"User Added"});
        })
        .catch(function (error) {
          console.log(error);
        });
    };
       
 render() {
    return (
      <div className="container-fluid">
        <div className="container wrapper"><br />
          <span id="req" className="wrapper">* required</span>
          <form onSubmit = {this.handleSubmit}>
            <Row>
              <Col md={4}>
                <label id='signlable'>*Name
                  <FormControl type="text" name="name" placeholder="Name" autoFocus required
                    onChange = {this.onChange} 
                  />
                </label>
              </Col>
              <Col md={4}>
                <label id='signlable'>*User Name
                  <FormControl type="text" name="userName" placeholder="User Name" required
                    onChange = {this.onChange}
                  />
                </label><br />
              </Col>
              <Col md={4}>
                <label id='signlable'>*Email:
                  <FormControl type="email" name="email" placeholder="Email" required
                    onChange={this.onChange}/> 
                </label><br />
              </Col>
            </Row><br />
            <Row>   
              <Col md={4}>
                <label id='signlable'>*Password
                  <FormControl type="password" name="password" placeholder="Password" autoFocus required
                    onChange = {this.onChange}/>
                </label><br />
              </Col>
              <Col md={4}>   
                <label id='signlable'>*Phone Number 
                  <FormControl type="number" name="phoneNumber" placeholder="Phone Number" required
                    onChange={this.onChange}/>
                </label><br />    
              </Col>
              <Col md={4}>
                <label id='signlable'>*Gender
                  <select name = "gender" className="form-control btn btn-default" onChange={this.onChange} required>
                    <option value="Select">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label><br />
              </Col>
            </Row><br />
            <Row>
              <Col md={4}>
                <label id='signlable'>*Age
                 <FormControl type="number" name="age" placeholder="Age" required
                  onChange={this.onChange}/>
                </label><br />
              </Col>  
              <Col md={4}>
                <label id='signlable'>Nationality
                  <FormControl type="text" name="nationality" placeholder="Nationality" 
                    onChange={this.onChange}/>
                </label><br />
              </Col>  
              <Col md={4}>
                <label id='signlable'>Address
                  <select name = "address" className="form-control btn btn-default" onChange={this.onChange} required>
                    <option value="Select">Select Location</option>
                    <option value="Amman">Amman</option>
                    <option value="Irbid">Irbid</option>
                    <option value="Zarqa">Zarqa</option>
                    <option value="Jerash">Jerash</option>
                    <option value="Aqaba">Aqaba</option>
                  </select>
                </label><br />
              </Col>  
            </Row><br />
            <Row>
              <Col md={4}>
                <FormGroup controlId="image-Uploader">
                  <ControlLabel>Upload Image
                   <FormControl onChange={this.onImageChange.bind(this)}  type='file' label='Image' name='image' />
                    {this.state.messageImg}
                  </ControlLabel>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}></Col>
              <Col md={4}>   
                <Button type="submit" bsStyle="primary" bsSize="large">SignUp</Button> 
                <h3 className="SuccessMessage">{this.state.message}</h3>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    )
  }
}
export default SignUpForm;
