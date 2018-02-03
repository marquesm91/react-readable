import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import './index.css';

ReactDOM.render(
  <BrowserRouter><App store={store} /></BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
