import React, { Component } from 'react';
import MyGoogleMap from './MyGoogleMap';
import NewIssue from './NewIssue';


class HomePage extends Component {
  state = {
    issues: []
  }

  componentDidMount() {
    this.getIssues();
  }

  // AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4

  getIssues = _ => {
    fetch('http://localhost:5000/issues')  
      .then(response => response.json()) 
      .then(response => this.setState({ issues: response.data}))
      .catch(err => console.log(err))
  }

  // renderIssues = ({issuesId, location}) => <div key={issueId}>{location}</div>
  render() {
      return (
          <div>
            <MyGoogleMap />
            <NewIssue />
           
          </div>
      );

  }
}

export default HomePage;