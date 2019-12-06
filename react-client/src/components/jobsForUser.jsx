import React from 'react';
import { Button, FormControl, Row, Col, ButtonToolbar, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import $ from 'jquery';
class JobsForUser extends React.Component {
  constructor(props) {
    super(props);
    this.deleteJobs = this.deleteJobs.bind(this);
  }

  componentDidMount() {
  }

  deleteJobs(e) {
    $.ajax({
      url: `/delete/${this.props.item.jobTitle}`,
      method: 'DELETE',
    })
    .done (function (data) {
      alert('Job deleted');
    })
    .fail(function( jqXHR, textStatus ) {
      alert("error");
    });
  }

  render() {
    return (
      <div className='container'>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title id='pa' toggle>
              {this.props.item.jobTitle}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <div className='row'>
              <div className='col-md-9'>
                <ListGroupItem header="Category :">{this.props.item.category}</ListGroupItem>
                <ListGroupItem header="available :">from {this.props.item.from} to {this.props.item.to}</ListGroupItem>
                <ListGroupItem header="Description :">{this.props.item.jobDescription}</ListGroupItem>
              </div>
              <div className='col-md-3'>
                <ListGroupItem>
                  <Link to = {`/UserJobs/${ this.props.item.jobTitle }/${ this.props.item.user }`}>
                    <Button bsStyle="warning" bsSize="large">Edit</Button>
                  </Link>
                  </ListGroupItem>
                <ListGroupItem >
                  <Button bsStyle="danger"bsSize="large" onClick={this.deleteJobs}>Delete</Button>
                </ListGroupItem>
              </div>
            </div>
          </Panel.Body>
          <Panel.Footer>
            {this.props.item.created_at.slice(0, 10)}
          </Panel.Footer>
        </Panel>
      </div>
    )
  }
}
export default JobsForUser;
/*

*/