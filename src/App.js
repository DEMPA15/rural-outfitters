import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import Login from './Components/Login/Login';
import Market from  './Components/Market/Market';
import Details from './Components/Details/Details';
import Basket from './Components/Basket/Basket';
import {getBasketCount} from './Redux/Actions/action'

class App extends Component {
  componentDidMount(){
    this.props.getBasketCount();
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path={`/market`} component={Market} />
            <Route path={`/details`} component={Details} />
            <Route path={`/basket`} component={Basket} />
            <Route path={`/login`} component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getBasketCount}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(App);
