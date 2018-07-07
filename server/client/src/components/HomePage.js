import React, { Component } from 'react';
import MyGoogleMap from './MyGoogleMap';
import NewIssue from './NewIssue';


class HomePage extends Component {

  // AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4

  // renderIssues = ({issuesId, location}) => <div key={issueId}>{location}</div>
  render() {
      return (
          <div>
            <MyGoogleMap />
          </div>
      );

  }
}

export default HomePage;