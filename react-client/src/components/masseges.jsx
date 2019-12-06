import React from 'react';
import {Button,Form,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import axios from 'axios';
class Masseges extends React.Component{
	constructor(props){
		super(props);
		this.state={
			text:'',
			phone:'',
			sender:'',
		}
	this.handleChange1=this.handleChange1.bind(this)
	this.handleChange2=this.handleChange2.bind(this)
	this.handleChange3=this.handleChange3.bind(this)	
	this.send=this.send.bind(this)
	}

	handleChange1(e){
		this.setState({
			text:e.target.value
		})
	}
	handleChange2(e){
		this.setState({
			phone:e.target.value
		})
	}
	handleChange3(e){
		this.setState({
			sender:e.target.value
		})
	}
	send(){
		var that=this
		axios({
			method:'post',
			url:'/messages',
			data:{
				username:this.props.username,
				text:this.state.text,
				sender:this.state.sender,
				phone:this.state.phone
			},
		})
		.then(function(responce){
			console.log(responce);
		})
		.catch(function(response){
			console.log(responce)
		});

	}

	render(){
		return(
			<div>
			<Form inline>
  <FormGroup controlId="formInlineName">
    <ControlLabel>Name</ControlLabel>{' '}
    <FormControl type="text" value={this.state.sender} onChange={this.handleChange3} placeholder="Your name" />
  </FormGroup>{' '}
  <FormGroup controlId="formInlinePhone">
    <ControlLabel >Phone#</ControlLabel>{' '}
    <FormControl type="text" value={this.state.phone} onChange={this.handleChange2} placeholder="Your phone number" />
  </FormGroup>{' '}
  <FormGroup controlId="formInlineText">
    <ControlLabel>Message</ControlLabel>{' '}
    <FormControl type="text" value={this.state.text} onChange={this.handleChange1} placeholder="Write your message"/>
  </FormGroup>{' '}
  <Button onClick={this.send}>Send</Button>
</Form>
			</div>
			)


	}

}


export default Masseges;