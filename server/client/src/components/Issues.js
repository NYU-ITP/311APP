import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

class Issues extends Component {
  style = {
    textDecoration: 'None'
  };

  state = {
    issues: []
  }

  componentDidMount() {
    this.getIssues();
  }

  getIssues = _ => {
    fetch('http://localhost:5000/issues')
      .then(response => response.json())
      .then(response => this.setState({ issues: response.data }))
      .catch(err => console.log(err))
  }

  // renderIssues = ({issuesId, location}) => <div key={issueId}>{location}</div>
  render() {
    return (
      <div>
        <List>
          {this.state.issues.map(issue =>
            <Link
              key={issue.issueId}
              style={this.style}
              to={{
                pathname: '/issues/' + issue.issueId
              }}
            >
              <ListItem>
                <ListItemText key={issue.issueId} primary={issue.heading} secondary={issue.time.substring(0, 10)} />
              </ListItem>
              <Divider />
            </Link>
          )}
        </List>
      </div>
    );

  }
}

export default Issues;