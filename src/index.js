import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './Redux/Reducers/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(
      promiseMiddleware()
    )
  ))

  ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
