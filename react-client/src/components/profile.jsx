import React from 'react';
import axios from 'axios';
import JobsForUser from './jobsForUser.jsx';
import Search from './Search.jsx';
import UserInfo from './UserInfo.jsx';
import Pmessage from './profilemessage.jsx';
import { Alert } from 'react-bootstrap';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      jobs: [],
      user:[],
      username:'',
      newMesg: false
    }
  }

//make new get requests for each filter
  componentDidMount() {
    axios.get('/userJobs')
      .then(response => {
        const posts = response.data;
        this.setState({jobs:posts});
      })
      .catch(function (error) {
        console.log(error);
      });
    this.getUserInfo();
    this.getMessages();
  }

  getUserInfo(){
    axios.get('/userInfo')
      .then(response => {
        const posts = response.data;
        this.setState({user:posts});
        this.setState({username:posts.userName})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMessages() {
    var that=this;
    axios.get('/messages')
    .then(function(response){
      console.log(response.data)
      for (var i = 0 ; i < response.data.length ; i++) {
        if (that.state.username === response.data[i].username){
          if (response.data[i].read === false) {
            that.setState({
              newMesg:true
            })
          }
        }
      }
    })
  }

  render() {
    var arr = [];

    this.state.jobs.forEach(function(item, index) {
      arr.push(<JobsForUser item={item} key={index}/>)
    })
    if (this.state.username.length === 0) {
      return (<h1>Loading</h1>)
    }
    if (this.state.newMesg) {
      return (
        <div>
          <br/>
          <div className='container'>
            <Alert bsStyle="danger"><h4>Hello {this.state.username} you have unread messages</h4></Alert>
          </div>
          <div>
            <UserInfo user={this.state.user} username={this.state.username}/>
          </div>
          <div>
            {arr}
          </div>
          <br /><br />
        </div>
      )
    }

    return (
      <div>
        <br/>
        <div>
          <UserInfo user={this.state.user} username={this.state.username}/>
        </div>
        <div>
          {arr}
        </div>
        <br /><br />
      </div>
    )
  }
}
export default Profile;