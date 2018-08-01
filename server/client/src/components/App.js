import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import Issues from './Issues';
import IssueDetail from './IssueDetail';
import NewIssue from './NewIssue';
import Gov from './Gov';
import GovDetails from './GovDetails';
import GovIssueDetail from './GovIssueDetail';

class App extends React.Component {
  render() {
    return (
      <div>
          <HashRouter>
          <div>
            <Header />
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/" component={Header} /> */}
            <Route exact path="/issues" component={Issues} />
            <Route exact path="/issues/:issueIdInRoute" component={IssueDetail} />
            <Route exact path="/newIssue" component={NewIssue} />
            <Route exact path="/govSelect" component={Gov} />
            <Route exact path="/govSelect/govDetails/:munLevel/:munName" component={GovDetails} />
            <Route exact path="/govSelect/govDetails/:issueId" component={IssueDetail} />
          </div>
          </HashRouter>
      </div>
    );
  }
};

export default App;