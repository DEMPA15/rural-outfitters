import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Market from  './Components/Market/Market';
import Details from './Components/Details/Details';
import Basket from './Components/Basket/Basket';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path={`/market`} component={Market}/>
            <Route path={`/details`} component={Details}/>
            <Route path={`/basket`} component={Basket}/>
            <Route path={`/`} component={Login}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
