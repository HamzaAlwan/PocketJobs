import React from 'react';
import { PanelGroup, Panel, Button, Well, FormControl, Row, Col, Thumbnail, ListGroup, ListGroupItem } from 'react-bootstrap';
import $ from 'jquery';
import Pmessage from './profilemessage.jsx';

class UsersProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[],
      username:''
    }
    console.log('this state user',this.state.user)
    console.log('this state props',this.props)

  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    console.log("hi")
    var that = this;
    var user = this.props.match.params.username
    this.setState({
      username:user
    })
    console.log(user)
    $.ajax({
      url: `/useri/${user}`,
      method: 'GET',
    })
    .done (function (data) {
      console.log('data',data)
      that.setState({
        user: data
      });
    })
    .fail(function( jqXHR, textStatus ) {
      alert( "No user Found");
    });
  }

  render() {
    console.log('username ====',this.state.username)
    return(
      <div className = 'container'>
        <br />
        <Row>
          <Col md={3}>
            <Thumbnail className = 'outerBorder' src={this.state.user.image} height="250px">
              <ListGroupItem header="Full name :">{this.state.user.name}</ListGroupItem>
              <ListGroupItem header="Nationality :">{this.state.user.nationality}</ListGroupItem>
              <ListGroupItem header="Rate :">here we put rating</ListGroupItem>
            </Thumbnail>
          </Col>
          <Col md={9}>
            <Thumbnail className = 'outerBorder'>
              <ListGroupItem header="Email :">{this.state.user.email}</ListGroupItem>
              <ListGroupItem header="Gender :">{this.state.user.gender}</ListGroupItem>
              <ListGroupItem header="Phone :">{this.state.user.phoneNumber}</ListGroupItem>
              <ListGroupItem header="Address :">{this.state.user.address}</ListGroupItem>
              <ListGroupItem header="Age :">{this.state.user.age}</ListGroupItem>
            </Thumbnail>
          </Col>
        </Row>
      </div>
    )
  }
}
export default UsersProfile;