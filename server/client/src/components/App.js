import React from 'react';
import { Route } from 'react-router';
import Header from './Header';
import HomePage from './HomePage';
import Issues from './Issues';
import IssueDetail from './IssueDetail';
// import NewIssue from './NewIssue';



class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/issues" component={Issues} />
        <Route exact path="/issues/:issueIdInRoute" component={IssueDetail} />
      </div>
    );
  }
};

export default App;