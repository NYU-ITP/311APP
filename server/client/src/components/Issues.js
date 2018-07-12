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
    issues: [{"issueId":1,"time":"2000-01-01T05:00:00.000Z","heading":"Trash disposal","category":"Garbage storage","content":"Property owners must clean and sweep the sidewalks and gutters next to their property, including 18 inches from the curb into the street. Property owners who do not clean the sidewalks and gutters bordering their property may be issued a summons.","location":"Washington Square","urgent":1,"downvote":1,"upvote":3},{"issueId":2,"time":"1998-02-02T05:00:00.000Z","heading":"Damaged tree","category":"Streets and sidewalks","content":"The Department of Parks and Recreation (DPR) removes street trees and large branches that have fallen to the ground in front of houses, in parks, and in other public places. ","location":"Wasserman Center","urgent":0,"downvote":null,"upvote":2}]
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