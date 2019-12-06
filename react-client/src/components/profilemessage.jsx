import React from 'react';
import {Button ,Modal,ListGroupItem,ListGroup} from 'react-bootstrap';
import axios from 'axios';
class Pmessage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			messages:[],
			show:false,
			username:''
		}
		this.show=this.show.bind(this);
		this.handleHide=this.handleHide.bind(this);
	}

	componentDidMount(){
		var that=this;
		axios.get('/messages')
		.then(function(response){
			var arr = [];
			for( var i = 0 ; i < response.data.length ; i++) {
				if (response.data[i].username === that.props.username) {
					arr.push(response.data[i])
				}
			}
			that.setState({
				messages:arr
			})
		})
	}

	show(){
		var that=this
		this.setState({
			show:true,
			username:this.props.username
		})
		  axios.put('/messages', {username:that.props.username})
          .then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
        });
	}

	handleHide(){
		this.setState({
			show:false
		})

	}

	render(){
		var that=this;
	var arr = [];
	var newMsg=[];
	var readMsg=[];
	var m=0;
    this.state.messages.forEach(function(item, index) {
      if(item.username===that.props.username&&!(item.read)){
      newMsg.push(item)
      }
      if(item.username===that.props.username&&item.read &&m<3){
      	readMsg.push(item);
      	m++
      }
    })
		return(
			<div>
			<Button onClick={this.show} bsStyle='success' bsSize="large">
			Messages	
			</Button>
			<Modal show={this.state.show} onHide={this.handleHide} container={this}>
				<Modal.Header>
					<Modal.Title>
					your msg
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<ListGroup>
				{newMsg.map(function(result){
					return(
						<div>
  					<ListGroupItem bsStyle="success">{result.text }{' I am '}{ result.sender}{' call me '}{result.phone}</ListGroupItem>
						</div>
						)
				})}
				</ListGroup>
				<ListGroup>
				{readMsg.map(function(result){
					return(
						<div>
  					<ListGroupItem bsStyle="warning">{result.text }{' I am '}{ result.sender}{' call me '}{result.phone}</ListGroupItem>
						</div>
						)
					}
				)}
				</ListGroup>
				</Modal.Body>
				<Modal.Footer>
				
				<Button onClick={this.handleHide} bsStyle="primary">Close</Button>
				 
				</Modal.Footer>
			</Modal>
			</div>
			)
	}
}

export default  Pmessage;