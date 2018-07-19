import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class Comments extends React.Component {

  render() {
    return (
      
      <List>
        {this.props.commentList.map(comment =>
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