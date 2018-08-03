import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { levels } from '../globals';
import Typography from '@material-ui/core/Typography';
import { url } from '../globals';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  container: {
    maxWidth: 700,
    marginTop: 30,
    margin: "auto"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Gov extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      classes: props.classes,
      munLevel: "",
      munName: "",
      munDetails: [],
      disabled: true,
      subEnabled: false
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    //  this.handleNameChange = this.handleNameChange.bind(this);
    // this.handleLevelChange = this.handleLevelChange.bind(this);
    //  this.getMunDetails = this.getMunDetails.bind(this);
  }



  getMunDetails = _ => {
    fetch(url + "/munDetails/" + this.state.munLevel)
      .then(response => response.json())
      .then(response => this.setState({ munDetails: response.data }))
      .catch(err => console.log(err))
  }

  handleLevelChange(event) {
    this.setState({ munLevel: event.target.value }, function () {
      console.log("munLevel " + this.state.munLevel);
      this.getMunDetails();
    });
    this.setState({ disabled: false });
  }

  handleNameChange(event) {
    this.setState({ munName: event.target.value }, function () {
      console.log("munName " + this.state.munName);
    });
    this.setState({ subEnabled: true });
  }

  handleClose = event => {
    if (this.target1.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/govSelect/govDetails/' + this.state.munLevel + '/' + this.state.munName,
      // state: {
      //   munLevel: this.state.munLevel,
      //   munName: this.state.munName
      // },
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className={this.state.classes.root}>
            <div className={this.state.classes.container}>
              <Grid item xs={12}>
                <FormControl required className={this.state.classes.formControl}>
                  <Typography variant="subheading">
                    <br /><b>Select municipality level:</b>
                  </Typography>
                  {/* <InputLabel htmlFor="mun-helper">Levels</InputLabel> */}
                  <Select
                    name="munLevel"
                    value={this.state.munLevel}
                    onChange={(e) => this.handleLevelChange(e)}
                    // required="required"
                    input={<Input name="Municipality Level" id="mun-helper" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {levels.map(lev =>
                      <MenuItem onClick={this.handleClose} value={lev}>{lev}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl required className={this.state.classes.formControl}>
                  <Typography variant="subheading">
                    <br /><b>Select the name of your municipality:</b>
                  </Typography>
                  {/* {this.state.mun_details.toString()} */}
                  <Select
                    name="munName"
                    value={this.state.munName}
                    onChange={(e) => this.handleNameChange(e)}
                    // required="required"
                    disabled={this.state.disabled}
                    input={<Input name="Municipality Name" id="munname-helper" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.state.munDetails.map(nms =>
                      <MenuItem onClick={this.handleClose} value={nms.mun_name}>{nms.mun_name}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button disabled={!this.state.subEnabled} variant="contained" size="large" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </div>
          </div>
        </form>
      </div>
    );
  }
}



Gov.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gov);