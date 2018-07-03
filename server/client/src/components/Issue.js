import React, { Component } from 'react';

class Issue extends Component {
    state = {
      issues: []
    }
  
    componentDidMount() {
      this.getIssues();
    }

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
              This is IssuePage
              <ul>
                {this.state.issues.map(issue =>
                <li>
                    <h2>{issue.issueId}</h2>
                    <p>{issue.location}</p>
                </li>)}
              </ul> 
            </div>
        );
  
    }
  }
  
  export default Issue;