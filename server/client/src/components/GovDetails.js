import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { url } from '../globals';
import Divider from '@material-ui/core/Divider';


class GovDetails extends React.Component {
  
  style = {
    textDecoration: 'None'
  };

  constructor(props) {
    super(props);
    let pathname = this.props.location.pathname;
    let params = pathname.split('/');
    let munName = params[params.length - 1];
    let munLevel = params[params.length - 2];
    this.state = {
      open: false,
      classes: props.classes,
      munLevel: munLevel,
      munName: munName,
      muns_list: [],
      munIssues: []
    }
    // this.get_issues = this.get_issues.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  // get_category_mun = _ => {
  //     fetch(url + '/munDetails/' + this.state.mun_level + '/' + this.state.mun_name)
  //     .then(response => response.json())
  //     .then(response => this.setState({ muns_list: response.data }))
  //     .catch(err => console.log(err))
  // }

  getMunIssues = _ => {
    fetch(url + '/munDetailsIssues/' + this.state.munLevel + '/' + this.state.munName)
      .then(response => response.json())
      .then(response => this.setState({ munIssues: response.data }))
      .catch(err => console.log(err))
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }

  componentWillMount() {
    console.log(this.state.munLevel);
    console.log(this.state.munName);
    this.getMunIssues();
  }

  render() {
    return (
      <div>
        <List>
          {this.state.munIssues.map(issue =>
            <Link
              key={issue.issueId}
              style={this.style}
              to={{
                pathname: '/govSelect/govDetails/' + issue.issueId
              }}
            >
              <ListItem button onClick={this.handleClick}>
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

export default GovDetails;