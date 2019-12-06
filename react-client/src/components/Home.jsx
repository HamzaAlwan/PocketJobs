import React from 'react';
import axios from 'axios';
import {Button,Form,FormGrop,ControlLable,FormControl} from 'react-bootstrap';
import HomeDisplay from './HomeDisplay.jsx';
import Search from './Search.jsx'
import Masseges from './masseges.jsx'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  logout(event) {
    var that=this
    event.preventDefault();
    axios.post('/logout', this.state.states)
        .then(function (response) {
        window.location.href = "/login";
        })
        .catch(function (error) {
         console.log(error);
        });
      }

  searchJobCategory(category){
    var that = this;
   axios.post('/jobCategory', {"category": category})
        .then(function(response){
          const posts = response.data;
            that.setState({items: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
  }
  searchJobLocation(location){
    var that = this;
    console.log(location)
   axios.post('/jobLocation', {"location": location})
        .then(function(response){
          const posts = response.data;
            that.setState({items: posts});
        })
          .catch(function (error) {
            console.log(error);
        });
  }

  searchJobTitle(query) {
    var that = this;
     axios.post('/someJobs', {query:query})
      .then(function (response) {
          const posts = response.data;
          that.setState({items: posts});
      })
        .catch(function (error) {
          console.log(error);
      }); 
  }

//make new get requests for each filter
  componentDidMount() {
    console.log("hi");
    axios.get('/jobs')
    .then(response => {
      console.log(response.data)
      const posts = response.data;
      this.setState({items:posts});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    var arr = [];
      this.state.items.forEach(function(item) {
        arr.push(<HomeDisplay item={item} />)
      })
    return (
      <div className='container'>
        <br />
        <div>
          <center>
            <br />
            <Search searchJobTitle={this.searchJobTitle.bind(this)} searchJobCategory={this.searchJobCategory.bind(this)} searchJobLocation={this.searchJobLocation.bind(this)}/>
          </center>
        </div>
        <div>
          {arr}
        </div>
      </div>
    )
  }
}
export default Home;