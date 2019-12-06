import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import './styles/styles.scss';
import AppRouter from './routes/AppRouter.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    
   
  }
}

ReactDOM.render(<AppRouter  />, document.getElementById('app'));