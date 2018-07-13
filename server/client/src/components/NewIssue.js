import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  category: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: 'none',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
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
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
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


  render () {
    return (
      <div className={this.state.classes.container}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={theme}>
            <TextField
             className={this.state.classes.margin}
             label="IssueHeading"
             id="mui-theme-provider-input"
             />
          </MuiThemeProvider>
        </Grid>

        <Grid item xs={12}>
        <TextField
          defaultValue="Tell us what happened"
          label="IssueContent"
          id="bootstrap-input"
          multiline = {true}
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
          <MuiThemeProvider theme={theme}>
            <TextField
             className={this.state.classes.margin}
             label="IssueLocation"
             id="mui-theme-provider-input"
             />
          </MuiThemeProvider>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Manager className={this.state.classes.container}>
          <Target>
            <div
              ref={node => {
                this.target1 = node;
              }}
            >
              <Button
                aria-owns={this.state.open ? 'menu-list-grow' : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                Issue Category
              </Button>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={this.state.open}
            className={classNames({ [this.state.classes.popperClose]: !this.state.open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={this.state.open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleClose}>Categroy 1</MenuItem>
                    <MenuItem onClick={this.handleClose}>Categroy 2</MenuItem>
                    <MenuItem onClick={this.handleClose}>Categroy 3</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        </Grid>

      </div>

    );
  }
}


NewIssue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewIssue);