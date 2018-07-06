import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import Issues from './Issues';
import IssueDetail from './IssueDetail';
// import NewIssue from './NewIssue';



class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <BrowserRouter
          basename={window.location.hostname === 'nyu-itp.github.io' ? '/311APP' : '/'}
        >
          <div>
            <Header />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/issues" component={Issues} />
            <Route exact path="/issues/:issueIdInRoute" component={IssueDetail} />
          </div>
        </BrowserRouter>
      </div>

    );
  }
};

export default App;