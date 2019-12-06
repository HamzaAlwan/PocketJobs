import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem, Form, FieldGroup } from "react-bootstrap";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      val: '',
      loc:''
    };

    this.handleCategoryChange  = this.handleCategoryChange.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleInputChange(e) {
    this.props.searchJobTitle(e.target.value)
    this.setState({
      value: e.target.value
    });
  }

  handleCategoryChange(e){
    this.props.searchJobCategory(e.target.value)
    this.setState({
      val: e.target.value
    });
  }
  handleLocationChange(e){
    this.props.searchJobLocation(e.target.value)
    this.setState({
      loc: e.target.value
    });
  }

  render() {
    return (
      <div>  
        <Form inline>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Category </ControlLabel>{' '}
            <FormControl componentClass="select" placeholder="Category" onChange={this.handleCategoryChange} value={this.state.val}>
              <option value="All">All Catogery</option>
              <option value="Driver">Driver</option>
              <option value="Home Maintenance">Home Maintenance</option>
              <option value="Computer Maintenance">Computer Maintenance</option>
              <option value="Babysitting">Babysitting</option>
              <option value="Tutoring">Tutoring</option>
            </FormControl>
          </FormGroup>{'  '}
          <FormGroup controlId="formControlsSelect">
            <ControlLabel> Location </ControlLabel>{' '}
            <FormControl componentClass="select" placeholder="Location" onChange={this.handleLocationChange} value={this.state.loc}>
              <option value="All">All Locations</option>
              <option value="Amman">Amman</option>
              <option value="Irbid">Irbid</option>
              <option value="Zarqa">Zarqa</option>
              <option value="Jerash">Jerash</option>
              <option value="Aqaba">Aqaba</option>
            </FormControl>
          </FormGroup>{'   '}
          <FormGroup controlId="formControlsSelect">
            <ControlLabel> Search </ControlLabel>{' '}
              <FormControl
                type="text"
                value={this.state.value}
                onChange={this.handleInputChange}
                placeholder="Search Jobs"
              />
          </FormGroup>
        </Form>
      </div>
    );
  }
}


export default Search;