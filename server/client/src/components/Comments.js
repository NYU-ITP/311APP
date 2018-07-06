import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    this.getCommentsGorIssue();
  }

  getCommentsGorIssue = _ => {
    fetch('http://localhost:5000/issueComments/' + this.props.issueId)
      .then(response => response.json())
      .then(response => this.setState({ comments: response.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <List>
        {this.state.comments.map(comment =>
          <div>
            <ListItem>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={comment.content} />
            </ListItem>
            <Divider />
          </div>
        )}
      </List>
    );
  }

}

export default Comments;