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
import { url } from '../globals';
import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  container: {
    maxWidth: 700,
    marginTop: 20,
    margin: "auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});


class NewIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      classes: props.classes,
      heading: '',
      content: '',
      category: '',
      urgent: '',
      City: '',
      County: '',
      State: '',
      lat: '',
      lng: '',
      time: moment(this.props.start),
      munLevel: 'State',
      munFull: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
    this.getIssueLevel = this.getIssueLevel.bind(this);
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

  handleCatChange(event) {
    this.setState({ category: event.target.value }, function() {
      this.getIssueLevel(
        // function(){this.setState({munLevel: this.state.munFull.munLevel});}
      );
      // this.setState({munLevel: this.state.munFull.munLevel});
    });
  };

  getIssueLevel() {
    let data = this.props.history.location.state;
    fetch(url + '/munLevel/' + this.state.category + '/' + data.State + '/' + data.City + '/' + data.County)
      .then(response => response.json())
      .then(response => console.log(response.data))
      // .then(data => this.setState({munFull: data}))
      .then(data => this.setState({munLevel: data}))
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log("level is " + this.state.munLevel);
    let postData = {
      time: moment(this.state.time).format('MM-DD-YYYY'),
      heading: this.state.heading,
      category: this.state.category,
      content: this.state.content,
      location: this.props.history.location.state.address,
      urgent: this.state.urgent === true ? 1 : 0,
      downvote: 0,
      upvote: 0,
      City: this.props.history.location.state.City,
      County: this.props.history.location.state.County,
      State: this.props.history.location.state.State,
      lat: this.props.history.location.state.lat,
      lng: this.props.history.location.state.lng,
      level: this.state.munLevel
      // level: "State"
    };

    // On submit of the form, send a POST request with the data to the server.
    fetch(url + '/api/newIssue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
      .then(response => {
        console.log(response);
        if (response.status < 400) {
          this.props.history.push({
            pathname: '/',
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });

    // let postData2 = {

    // }

    // fetch(url + '/api/changeIssueLevel', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(postData2),
    // })
    //   .then(response => {
    //     console.log(response);
    //     if (response.status < 400) {
    //       this.props.history.push({
    //         pathname: '/',
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  handleChange(event) {
    if (event._isAMomentObject) {
      const beginDate = moment(event).format('MM-DD-YYYY');
      this.setState({
        time: beginDate
      });
    } else if (event.target.name === "urgent") {
      this.setState({ [event.target.name]: event.target.checked });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    const isEnabled = this.state.heading.length > 0 && this.state.content.length > 0 && this.state.category.length > 0;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={this.state.classes.root}>
          <div className={this.state.classes.container}>
            <Typography variant="subheading" gutterBottom>
              <b>DISCLAIMER:</b> Emergency assistance is not available through this Service Request.
            <br />Call 911 to report a crime or medical emergency; fighting, screaming, gunshots, explosions, or suspicious breaking of glass or wood.
          </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="subheading">
                  <br /><b>What is your complain about? </b>
                </Typography>
                <FormControl required className={this.state.classes.formControl}>
                  <InputLabel htmlFor="age-helper">Category</InputLabel>
                  <Select
                    name="category"
                    value={this.state.category}
                    onChange={this.handleCatChange}
                    // required="required"
                    input={<Input name="Category" id="category-helper" />}
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
              <Grid item xs={12}>
                <Typography variant="subheading">
                  <br /><b>Please enter the heading of issue.</b>
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
                <Typography variant="subheading">
                  <br /><b>Describe the issue in detail.</b>
                </Typography>
                <TextField
                  name="content"
                  className={this.state.classes.textField}
                  label="Content"
                  multiline={true}
                  rows={4}
                  value={this.state.content}
                  onChange={this.handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading">
                  <br /><b>Please check the box below if the matter is urgent:</b>
                </Typography>
                <FormControlLabel
                  name='urgent'
                  className={this.state.classes.textField}
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.urgent}
                      onChange={this.handleChange}
                    />
                  }
                  label="Urgent"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading">
                  <br /><b>When was the issue observed? (MM-DD-YYYY)</b>
                </Typography>
                <DatePicker
                  name="time"
                  // dateFormat="MM-DD-YYYY HH:mm:ss"
                  dateFormat="MM-DD-YYYY"
                  selected={moment(this.state.time)}
                  // selected={moment()}
                  // showTimeSelect
                  // timeFormat="HH:mm"
                  // timeIntervals={15}
                  minDate={moment().subtract(1, "months")}
                  maxDate={moment()}
                  showDisabledMonthNavigation
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={this.state.classes.textField}>
                  {
                    this.props.history.location.state
                      ? <Typography variant="subheading"><b><br />Location (as selected on map) :</b> {this.props.history.location.state.address}</Typography>
                      : null
                  }
                </div>
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