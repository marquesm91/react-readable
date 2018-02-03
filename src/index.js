import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
}

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      logger,
      thunk
    )
  )
);

ReactDOM.render(
  <BrowserRouter><App store={store} /></BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
