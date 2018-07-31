import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { withStyles } from '@material-ui/core/styles';
import Comments from './Comments';
import { url } from '../globals';

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

  class GovIssueDetail extends React.Component {
    constructor(props) {
      super(props);
      let issueId = props.location.pathname.split('/');
      issueId = issueId[issueId.length - 1];
      this.state = {
        classes: props.classes,
        issueDetail: [],
        comments: [],
        issueId: issueId,
      }
      // this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      this.getIssueDetail();
      this.getCommentsGorIssue();
    }

    getIssueDetail = _ => {
      fetch(url + '/govIssueDetail/' + this.state.issueId)
        .then(response => response.json())
        .then(response => this.setState({ issueDetail: response.data }))
        .catch(err => console.log(err))
    }

    getCommentsGorIssue = _ => {
      fetch(url + '/govIssueComments/' + this.state.issueId)
        .then(response => response.json())
        .then(response => this.setState({ comments: response.data }))
        .catch(err => console.log(err))
    }

    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    render() {
      return(
        <div className={this.state.classes.root}>{this.state.issueDetail.map(issue =>
          <div className={this.state.classes.container}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Paper className={this.state.classes.paperHeading}>{issue.heading}</Paper>
              </Grid>
              <Grid item xs={6} className={this.state.classes.center}>
                {/* <Button variant="contained" disabled={this.state.disabledUpvote} onClick={this.handleUpvoteClicked}> */}
                  <ListItemIcon>
                    <ThumbUpIcon />
                  </ListItemIcon>
                  {issue.upvote == null ? 0 : issue.upvote}
                {/* </Button> */}
              </Grid>
              <Grid item xs={6} className={this.state.classes.center}>
                {/* <Button variant="contained" disabled={this.state.disabledDownvote} onClick={this.handleDownvoteClicked}> */}
                  <ListItemIcon>
                    <ThumbDownIcon />
                  </ListItemIcon>
                  {issue.downvote == null ? 0 : issue.downvote}
                {/* </Button> */}
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.state.classes.paper}><b>Urgent:</b> {issue.urgent === 1 ? 'Yes' : 'No'}</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.state.classes.paper}><b>Category:</b> {issue.category}</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.state.classes.paper}><b>Date Reported:</b> {issue.time.substring(0, 10)}</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.state.classes.paperLeft}><b>Details:</b> {issue.content}</Paper>
              </Grid >
              <Grid item xs={12}>
                <Paper className={this.state.classes.paper}><b>Location:</b> {issue.location}</Paper>
              </Grid>
              <Grid item xs={12}>
                <Comments commentList={this.state.comments} />
              </Grid>
            </Grid>
          </div> )}
        </div>
      );
    }
  }

  GovIssueDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(GovIssueDetail);


