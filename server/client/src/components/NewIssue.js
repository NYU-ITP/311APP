import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
<<<<<<< HEAD
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
=======
import MenuList from '@material-ui/core/MenuList';
import { category } from '../globals';
>>>>>>> fa208f822203e01a0268741226d275af515eb010

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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  center: {
    textAlign: 'center'
  }
});


class NewIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
    }
  }

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.target1.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div className={this.state.classes.root}>
        <div className={this.state.classes.container}>
<<<<<<< HEAD
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
=======
        {this.props.history.location.state.cityUs}
>>>>>>> fa208f822203e01a0268741226d275af515eb010
          <Grid container spacing={24}>
            
            <Grid item xs={12}>
              <TextField
                id="full-width-textArea"
                className={this.state.classes.textField}
                label="Topic : ex Noise, Transportation"
                fullWidth
                multiline={true}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
            />
          }
          label="urgent"
        />
            </Grid>
            <Grid item xs={12}>
            <TextField
              className={this.state.classes.textField}
              label="Details"
              id="bootstrap-input"
              fullWidth
              multiline={true}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: this.state.classes.bootstrapRoot,
                  input: this.state.classes.bootstrapInput,
                },
              }}
              InputLabelProps={{
                shrink: true,
                className: this.state.classes.bootstrapFormLabel,
              }}
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
              Location :   
              {this.props.history.location.state.address}
              </div>
            </Grid>
            <Grid item xs={12}>
            <FormControl className={this.state.classes.formControl}>
              <InputLabel htmlFor="age-helper">Category</InputLabel>
              <Select
    
                onChange={this.handleChange}
                input={<Input name="category" id="category-helper" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" size="large" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>

        </div>
      </div>

    );
  }
}


NewIssue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewIssue);