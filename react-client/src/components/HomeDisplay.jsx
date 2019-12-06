import React from 'react';
import {Link} from 'react-router-dom';
import Masseges from './masseges.jsx'
import { Button, FormControl, ButtonToolbar,Panel,ListGroup,ListGroupItem } from 'react-bootstrap';
import Rate from './Rate.jsx'

class HomeDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	let phonNum=0;
    let image = null;
  	if(this.props.item.userInfo.length>0){
  		 phonNum=this.props.item.userInfo[0].phoneNumber;
       image = this.props.item.userInfo[0].image;
  	}
    return (
    	<div>
        <div>
    	    <Panel bsStyle='primary'>
          	<Panel.Heading>
            	<Panel.Title id='pa' toggle>{this.props.item.jobTitle} </Panel.Title>
          	</Panel.Heading>
          	<Panel.Body collapsible>
            	<div className='row'>
            		<div className='col-md-3' >
            			<ListGroup>
           				  <ListGroupItem>
                      <Link to = {`/user/${ this.props.item.user }`} >
                        {this.props.item.user}
                      </Link>
                    </ListGroupItem><br />
        		    	  <ListGroupItem>
                      <Rate user={this.props.item.user}/>
                    </ListGroupItem>
             				<ListGroupItem>
                      <img src={image} className='thumbnail' width="220px"/>                        
                    </ListGroupItem>
        		   		</ListGroup>
            		</div>
            		<div className='col-md-9'>
            			<ListGroup>
         				    <ListGroupItem>{this.props.item.jobDescription}</ListGroupItem><br />
        		    	  <ListGroupItem>{phonNum}</ListGroupItem>
         				    <ListGroupItem>I am avaliabe from {this.props.item.from} to {this.props.item.to}</ListGroupItem>
        		  	 	</ListGroup>
            		</div>
            	</div>
              <div className='row'>
                <ListGroupItem>
                  <Masseges username={this.props.item.user} />
                </ListGroupItem>
              </div>
          	</Panel.Body>
          	<Panel.Footer>
        		  {this.props.item.created_at.slice(0, 10)}
          	</Panel.Footer>
          </Panel>
        </div>
      </div>
    )
  }
}
export default HomeDisplay;