import React from 'react';
import ReactDom from 'react-dom';
// import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';


import App from './components/App';
// import reducers from './reducers';

// const store = createStore(() => [], {}, applyMiddleware());

ReactDom.render(
  <div>
        <BrowserRouter
          // basename={window.location.hostname === 'nyu-itp.github.io' ? '/311APP' : '/'}
        >
          <Route path="/" component={App} />
        </BrowserRouter>
      </div>,
document.querySelector('#root'));