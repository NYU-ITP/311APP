import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuList from '@material-ui/core/MenuList';
import { category } from '../globals';
import Form from 'react-validation/build/form';
import { Input as ValidationInput } from 'react-validation/build/input';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    maxWidth: 700,
    marginTop: 20,
    margin: "auto"
  },
  popperClose: {
    pointerEvents: 'none'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  center: {
    textAlign: 'center'
  }
});


class NewIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      classes: props.classes,
      heading: '',
      content:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.target1.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleSubmit(e) {
    e.preventDefault();
    let postData = {
      time: "2000-01-01",
      heading: this.state.heading,
      category: "Garbage storage",
      content: this.state.content,
      location: "Washington Square",
      urgent: 1,
      downvote: 1,
      upvote: 3
    };
    // On submit of the form, send a POST request with the data to the server.
    fetch('http://localhost:5000/api/newIssue', {
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={this.state.classes.root}>
          <div className={this.state.classes.container}>
            <div className={this.state.classes.textField}>
              User Alert
            <div>
                Emergency assistance is not available through this Service Request.
                Call 911 to report:
            <ul>
                  A crime or medical emergency
            </ul>
                <ul>
                  Fighting, screaming, gunshots, explosions, or suspicious breaking of glass or wood
            </ul>
                Describe the problem.
            </div>
            </div>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  name="heading"
                  className={this.state.classes.textField}
                  label="Heading"
                  multiline={true}
                  value={this.state.heading}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className={this.state.classes.textField}
                  control={
                    <Checkbox
                      color="primary"
                    />
                  }
                  label="Urgent"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="content"
                  className={this.state.classes.textField}
                  label="Content"
                  multiline={true}
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="datetime-local"
                  label="Date/Time Observed"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className={this.state.classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={this.state.classes.textField}>
                  {
                    this.props.history.location.state
                      ? <div>Location : {this.props.history.location.state.address}</div>
                      : null
                  }
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={this.state.classes.formControl}>
                  <InputLabel htmlFor="age-helper">Category</InputLabel>
                  <Select
                    onChange={this.handleChange}
                    input={<Input name="Category" id="category-helper" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {category.map(issueCategory =>
                      <MenuItem onClick={this.handleClose}>{issueCategory}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <Button variant="contained" size="large" color="primary">
                  Submit
                </Button> */}
                <input type="submit" value="Submit" />
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    );
  }
}


NewIssue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewIssue);