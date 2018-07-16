import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import Issues from './Issues';
import IssueDetail from './IssueDetail';
import NewIssue from './NewIssue';



class App extends React.Component {
  render() {
    return (
      <div>
          <HashRouter>
          <div>
            <Header />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/issues" component={Issues} />
            <Route exact path="/issues/:issueIdInRoute" component={IssueDetail} />
            <Route exact path="/newIssue" component={NewIssue} />
          </div>
          </HashRouter>
      </div>
    );
  }
};

export default App;