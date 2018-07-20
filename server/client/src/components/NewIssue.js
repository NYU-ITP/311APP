import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import { category } from '../globals';
import Typography from '@material-ui/core/Typography';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    // ...theme.typography.subheading,
    // height: 24,
    // boxSizing: 'content-box',
    // width: 'auto',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // paddingLeft: 16,
    // paddingRight: 16,
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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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
      category: '',
      cityUs: '',
      countyUs: '',
      stateUs: '',
      lat: '',
      lng: '',
      // time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      time: moment(this.props.start)
      // datetime: `${new Date().getFullYear()}-${`${new Date().getMonth() +
      //   1}`.padStart(2, 0)}-${`${new Date().getDay() + 1}`.padStart(
      //   2,
      //   0
      // )}T${`${new Date().getHours()}`.padStart(
      //   2,
      //   0
      // )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    // function validate(email, password) {
    //   // true means invalid, so our conditions got reversed
    //   return {
    //     email: email.length === 0,
    //     password: password.length === 0,
    //   };
    // }
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
      // time: "2000-01-01",
      time: this.state.time,
      heading: this.state.heading,
      // category: "Garbage storage",
      category: this.state.category,
      content: this.state.content,
      //location: "Washington Square",
      location: this.props.history.location.state.address,
      urgent: 1,
      downvote: 1,
      upvote: 3,
      cityUs: this.props.history.location.state.cityUs,
      countyUs: this.props.history.location.state.countyUs,
      stateUs: this.props.history.location.state.stateUs,
      lat: this.props.history.location.state.lat,
      lng: this.props.history.location.state.lng
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
      this.props.history.push({
        pathname: '/',
      });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleDateChange(date) {
    const beginDate = moment(date).format('YYYY-MM-DD');
    this.setState({
      time: beginDate
      // time: date
    });
  }
  
  render() {
    const isEnabled = this.state.heading.length > 0 && this.state.content.length > 0 && this.state.category.length > 0;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={this.state.classes.root}>
          <div className={this.state.classes.container}>
          <Typography variant="subheading" gutterBottom>
            <b>DISCLAIMER:</b> Emergency assistance is not available through this Service Request. 
            <br/>Call 911 to report a crime or medical emergency; fighting, screaming, gunshots, explosions, or suspicious breaking of glass or wood.
          </Typography>
            {/* <div className={this.state.classes.textField}>
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
            </div> */}
            <Grid container spacing={24}>
              <Grid item xs={12}>
              <Typography variant = "subheading">
                <br/><b>What is your complain about?</b>
              </Typography>  
                <TextField
                  name="heading"
                  className={this.state.classes.textField}
                  label="Heading"
                  multiline={true}
                  value={this.state.heading}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
              <Typography variant = "subheading">
                <br/><b>Please check the box below if the matter is urgent:</b>
              </Typography> 
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
              <Typography variant = "subheading">
                <br/><b>Describe the issue in detail.</b>
              </Typography> 
                <TextField
                  name="content"
                  className={this.state.classes.textField}
                  label="Content"
                  multiline={true}
                  value={this.state.content}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
              <Typography variant = "subheading">
                <br/><b>When was the issue observed? (mm/dd/yyyy, hh:mm AM/PM)</b>
              </Typography> 
                {/* <TextField
                  id="datetime-local"
                  //label="Date/Time Observed"
                  // value={this.state.datetime}
                  onChange={this.handleChange}
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  // defaultValue={this.state.datetime}
                  className={this.state.classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> */}
              <DatePicker
                name="time"
                // dateFormat="YYYY-MM-DD HH:mm:ss"
                dateFormat="YYYY-MM-DD"
                selected={moment(this.state.time)}
                // selected={moment()}
                // showTimeSelect
                // timeFormat="HH:mm"
                // timeIntervals={15}
                onChange={this.handleDateChange}
              />
              </Grid>
              <Grid item xs={12}>
                <div className={this.state.classes.textField}>
                  {
                    this.props.history.location.state
                      // ? <div>Location : {this.props.history.location.state.address}</div>
                      ? <Typography variant = "subheading"><b><br/>Location (as selected on map) :</b> {this.props.history.location.state.address}</Typography>
                      : null
                  }
                </div>
              </Grid>
              <Grid item xs={12}>
              <Typography variant = "subheading">
                <br/><b>Select the most appropriate category for the observed issue:</b>
              </Typography> 
                <FormControl required className={this.state.classes.formControl}>
                  <InputLabel htmlFor="age-helper">Category</InputLabel>
                  <Select
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                    // required="required"
                    input={<Input name="Category" id="category-helper"/>}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {category.map(issueCategory =>
                      <MenuItem onClick={this.handleClose} value={issueCategory}>{issueCategory}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
              <Typography variant="subheading" gutterBottom>
                    <em>NOTE: Fields marked with a * are mandatory</em>
              </Typography>
              <Grid item xs={12}>
                <Button disabled={!isEnabled} variant="contained" size="large" color="primary" type="submit">
                  Submit
                </Button>
                {/* <input type="submit" value="Submit" /> */}
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