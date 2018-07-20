import React from 'react';
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
    // let issueId = props.location.pathname.split('/');
    // issueId = issueId[issueId.length - 1];
    this.state = {
      classes: props.classes,
      issueId: props.issueId,
      issueDetail: [],
      comments:[],
      newCommentContent: '',
      disabledUpvote: false,
      disabledDownvote: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpvoteClicked = this.handleUpvoteClicked.bind(this);
    this.handleDownvoteClicked = this.handleDownvoteClicked.bind(this);
  }

  componentDidMount() {
    this.getIssueDetail();
    this.getCommentsGorIssue();
  }

  getIssueDetail = _ => {
    fetch('http://localhost:5000/issueDetail/' + this.state.issueId)
      .then(response => response.json())
      .then(response => this.setState({ issueDetail: response.data }))
      .catch(err => console.log(err))
  }

  getCommentsGorIssue = _ => {
    fetch('http://localhost:5000/issueComments/' + this.state.issueId)
      .then(response => response.json())
      .then(response => this.setState({ comments: response.data }))
      .catch(err => console.log(err))
  }

  handleSubmit(e) {
    e.preventDefault();
    let postData = {
      content: this.state.newCommentContent,
      issueId: this.state.issueId
    };
    // On submit of the form, send a POST request with the data to the server.
    fetch('http://localhost:5000/api/newComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.getCommentsGorIssue();
        this.setState({newCommentContent: ''});
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUpvoteClicked() {
    if (!this.state.disabledUpvote) {
      this.setState({
        disabledUpvote: true,
        disabledDownvote: false
      });
    }
  }
  
  handleDownvoteClicked() {
    if (!this.state.disabledDownvote) {
      this.setState({
        disabledUpvote: false,
        disabledDownvote: true
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className={this.state.classes.root}>{this.state.issueDetail.map(issue =>
        <div className={this.state.classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={this.state.classes.paperHeading}>{issue.heading}</Paper>
            </Grid>
            <Grid item xs={6} className={this.state.classes.center}>
              <Button color="primary" disabled={this.state.disabledUpvote} onClick={this.handleUpvoteClicked}>
                <ListItemIcon>
                  <ThumbUpIcon />
                </ListItemIcon>
                {issue.upvote == null ? 0 : issue.upvote}
              </Button>
            </Grid>
            <Grid item xs={6} className={this.state.classes.center}>
              <Button color="primary" disabled={this.state.disabledDownvote} onClick={this.handleDownvoteClicked}>
                <ListItemIcon>
                  <ThumbDownIcon />
                </ListItemIcon>
                {issue.downvote == null ? 0 : issue.downvote}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.state.classes.paper}>Urgent: {issue.urgent === 1 ? 'Yes' : 'No'}</Paper>
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
              <Comments commentList={this.state.comments}/>
            </Grid>
            <Grid item xs={12} className={this.state.classes.center}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  className={this.state.classes.textField}
                  name='newCommentContent'
                  value={this.state.newCommentContent}
                  placeholder="Add a comment"
                  fullWidth
                  multiline={true}
                  onChange={this.handleChange}
                />
                {/* <Button variant="contained" size="large" color="primary">
                  Submit Comment
                </Button> */}
                <input type="submit" value="Submit Comment" />
              </form>
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