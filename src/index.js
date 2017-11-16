import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import App from './components/app'; -> don't need this if using react-router
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import reducers from './reducers';

import promise from 'redux-promise';

//this ensures whatever is in actions goes through middleware before hitting reducers
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.container'));