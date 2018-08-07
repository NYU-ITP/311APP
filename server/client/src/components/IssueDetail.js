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
import { withRouter } from 'react-router-dom';
import Comments from './Comments';
import { url } from '../globals';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class IssueDetail extends React.Component {

  constructor(props) {
    super(props);
    // the issueId for govIssueDetail Page is fetched from url, and stored in state
    // the issueId for IssueDetail modal is fetched from props
    let pathname = this.props.location.pathname;
    let issueId = pathname.split('/');
    issueId = issueId[issueId.length - 1];
    this.state = {
      classes: props.classes,
      issueDetail: [],
      comments: [],
      newCommentContent: '',
      disabledUpvote: pathname === '/' ? false : true,
      disabledDownvote: pathname === '/' ? false : true,
      issueId: issueId,
      pathname: pathname,
      munLevel: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitIssueLevel = this.handleSubmitIssueLevel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpvoteClicked = this.handleUpvoteClicked.bind(this);
    this.handleDownvoteClicked = this.handleDownvoteClicked.bind(this);
  }

  componentDidMount() {
    this.getIssueDetail();
    this.getCommentsGorIssue();
  }

  getIssueDetail = _ => {
    let pathname = this.state.pathname;
    let issueDetail = '/issueDetail/';
    let issueId = pathname === '/' ? this.props.issueId : this.state.issueId;
    fetch(url + issueDetail + issueId)
      .then(response => response.json())
      .then(response => this.setState({ issueDetail: response.data }))
      .catch(err => console.log(err))
  }

  getCommentsGorIssue = _ => {
    let pathname = this.state.pathname;
    let issueComments = '/issueComments/';
    let issueId = pathname === '/' ? this.props.issueId : this.state.issueId;
    fetch(url + issueComments + issueId)
      .then(response => response.json())
      .then(response => this.setState({ comments: response.data }))
      .catch(err => console.log(err))
  }

  // getIssueDetail = _ => {
  //   fetch(url + '/govIssueDetail/' + this.state.issueId)
  //     .then(response => response.json())
  //     .then(response => this.setState({ issueDetail: response.data }))
  //     .catch(err => console.log(err))
  // }

  // getCommentsGorIssue = _ => {
  //   fetch(url + '/govIssueComments/' + this.state.issueId)
  //     .then(response => response.json())
  //     .then(response => this.setState({ comments: response.data }))
  //     .catch(err => console.log(err))
  // }

  handleSubmit(e) {
    e.preventDefault();
    let postData = {
      content: this.state.newCommentContent,
      issueId: this.props.issueId
    };
    // On submit of the form, send a POST request with the data to the server.
    fetch(url + '/api/newComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
      .then(response => {
        console.log(response);
        if (response.status < 400) {
          this.getCommentsGorIssue();
          this.setState({ newCommentContent: '' });
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmitIssueLevel(e) {
    e.preventDefault();
    let postData = {
      munLevel: this.state.munLevel,
      issueId: this.state.issueId
    };
    fetch(url + '/api/changeIssueLevel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
      .then(response => {
        if (response.status < 400) {
          this.setState(preState => ({
            issueDetail: [{ ...preState.issueDetail[0], level: this.state.munLevel }],
          }))
          alert("Issue level is changed successfully!");
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUpvoteClicked(e) {
    e.preventDefault();
    let postData = {
      upvote: this.state.issueDetail[0].upvote + 1,
      issueId: this.props.issueId
    };
    fetch(url + '/api/changeUp', {
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
        if (!this.state.disabledUpvote) {
          this.setState(preState => ({
            issueDetail: [{ ...preState.issueDetail[0], upvote: this.state.issueDetail[0].upvote + 1 }],
            disabledUpvote: true,
            disabledDownvote: true,
          }))
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDownvoteClicked(e) {
    e.preventDefault();
    let postData = {
      downvote: this.state.issueDetail[0].downvote + 1,
      issueId: this.props.issueId
    };
    fetch(url + '/api/changeDown', {
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
        if (!this.state.disabledDownvote) {
          this.setState(preState => ({
            issueDetail: [{ ...preState.issueDetail[0], downvote: this.state.issueDetail[0].downvote + 1 }],
            disabledUpvote: true,
            disabledDownvote: true
          }));
        }
      })
      .catch(err => {
        console.log(err);
      });
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
              <Button variant="contained" disabled={this.state.disabledUpvote} onClick={this.handleUpvoteClicked}>
                <ListItemIcon>
                  <ThumbUpIcon />
                </ListItemIcon>
                {issue.upvote == null ? 0 : issue.upvote}
              </Button>
            </Grid>
            <Grid item xs={6} className={this.state.classes.center}>
              <Button variant="contained" disabled={this.state.disabledDownvote} onClick={this.handleDownvoteClicked}>
                <ListItemIcon>
                  <ThumbDownIcon />
                </ListItemIcon>
                {issue.downvote == null ? 0 : issue.downvote}
              </Button>
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
            {
              this.state.pathname === '/' ?
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
                    <br /><br />
                    <Button variant="contained" size="large" color="primary" type="submit">
                      Submit Comment
                          </Button>
                  </form>
                </Grid>
                :
                <Grid item xs={12}>
                  <Paper className={this.state.classes.paper}><b>Issue Level:</b> {issue.level}</Paper>
                </Grid>
            }
            {
              this.state.pathname === '/' ? null :
                <form onSubmit={e => this.handleSubmitIssueLevel(e)}>
                  <Grid item xs={12}>
                    <FormControl required className={this.state.classes.formControl}>
                      <Typography variant="subheading">
                        <br /><b>Select municipality level of this issue:</b>
                      </Typography>
                      <Select
                        name="munLevel"
                        value={this.state.munLevel === '' ? issue.level : this.state.munLevel}
                        onChange={this.handleChange}
                        // required="required"
                        input={<Input name="level" id="mun-helper" />}
                      >
                        {/* <MenuItem value=""><em>None</em></MenuItem> */}
                        {/* <MenuItem value={issue.City}>{"City: " + issue.City}</MenuItem>
                        <MenuItem value={issue.County}>{"County: " + issue.County}</MenuItem>
                        <MenuItem value={issue.State}>{"State: " + issue.State}</MenuItem> */}
                        <MenuItem value={"City"}>{"City: " + issue.City}</MenuItem>
                        <MenuItem value={"County"}>{"County: " + issue.County}</MenuItem>
                        <MenuItem value={"State"}>{"State: " + issue.State}</MenuItem>
                      </Select>
                      <FormHelperText>Required</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" size="large" color="primary" type="submit">
                      Submit
                  </Button>
                  </Grid>
                </form>
            }
          </Grid>
        </div>
      )}</div>
    );
  }
}

IssueDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(IssueDetail));