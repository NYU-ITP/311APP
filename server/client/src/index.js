import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';


import App from './components/App';


ReactDom.render(
  <div>
        <BrowserRouter
          // basename={window.location.hostname === 'nyu-itp.github.io' ? '/311APP' : '/'}
        >
          <Route path="/" component={App} />
        </BrowserRouter>
      </div>,
document.querySelector('#root'));