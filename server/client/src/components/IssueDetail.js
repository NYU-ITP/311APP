import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { withStyles } from '@material-ui/core/styles';
import Comments from './Comments';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    maxWidth: 700,
    marginTop: 20,
    margin: "auto"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperHeading: {
    fontSize: 20,
    fontWeight: 1000,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperLeft: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  center: {
    textAlign: 'center'
  }
});

class IssueDetail extends React.Component {

  constructor(props) {
    super(props);
     let issueId = props.location.pathname.split('/');
   issueId = issueId[issueId.length - 1];
    this.state = {
      classes: props.classes,
       issueId: issueId,
      issueDetail: [{"issueId":1,"time":"2000-01-01T05:00:00.000Z","heading":"Trash disposal","category":"Garbage storage","content":"Property owners must clean and sweep the sidewalks and gutters next to their property, including 18 inches from the curb into the street. Property owners who do not clean the sidewalks and gutters bordering their property may be issued a summons.","location":"Washington Square","urgent":1,"downvote":1,"upvote":3}],
    }
  }

  componentDidMount() {
    this.getIssueDetail();
  }

  getIssueDetail = _ => {
    fetch('http://localhost:5000/issueDetail/' + this.state.issueId)
      .then(response => response.json())
      .then(response => this.setState({ issueDetail: response.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className={this.state.classes.root}>{this.state.issueDetail.map(issue =>
        <div className={this.state.classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={this.state.classes.paperHeading}>{issue.heading}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.state.classes.paper}>Urgent: {issue.urgent == 1 ? 'Yes' : 'No'}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={this.state.classes.paper}>
                <ListItemIcon>
                  <ThumbUpIcon />
                </ListItemIcon>
                {issue.upvote == null ? 0 : issue.upvote}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={this.state.classes.paper}>
                <ListItemIcon>
                  <ThumbDownIcon />
                </ListItemIcon>
                {issue.downvote == null ? 0 : issue.downvote}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.state.classes.paper}>Category: {issue.category}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.state.classes.paper}>Post Time: {issue.time.substring(0, 10)}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.state.classes.paperLeft}>Content: {issue.content}</Paper>
            </Grid >
            <Grid item xs={12}>
              <Paper className={this.state.classes.paper}>Location: {issue.location}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Comments issueId={this.state.issueId}/>
            </Grid>
            <TextField
              id="full-width-textArea"
              className={this.state.classes.textField}
              // label="Label"
              // InputLabelProps={{
              //   shrink: true,
              // }}
              placeholder="Add a comment"
              fullWidth
              multiline={true}
            />
            <Grid item xs={12} className={this.state.classes.center}>
              <Button variant="contained" size="large" color="primary">
                Submit Comment
              </Button>
            </Grid>
          </Grid>
        </div>
      )}</div>
    );
  }
}

IssueDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IssueDetail);