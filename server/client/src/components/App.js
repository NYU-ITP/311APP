import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import Issues from './Issues';
import IssueDetail from './IssueDetail';
// import NewIssue from './NewIssue';



class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter
          basename={window.location.hostname === 'nyu-itp.github.io' ? '/311APP' : '/'}
        >
          <div>
            <Header />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/issues" component={HomePage} />
            <Route exact path="/issues/:issueIdInRoute" component={HomePage} />
          </div>
        </BrowserRouter>
      </div>

    );
  }
};

export default App;