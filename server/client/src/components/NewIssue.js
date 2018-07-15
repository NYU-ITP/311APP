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
        {this.props.location.state}
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="full-width-textArea"
                className={this.state.classes.textField}
                label="Heading"
                fullWidth
                multiline={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={this.state.classes.textField}
                label="Content"
                fullWidth
                multiline={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={this.state.classes.textField}
                label="Location"
                fullWidth
                multiline={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Manager>
                <Target>
                  <div
                    ref={node => {
                      this.target1 = node;
                    }}>
                    <Button variant="contained" size="large" color="primary"
                      aria-owns={this.state.open ? 'menu-list-grow' : null}
                      aria-haspopup="true"
                      onClick={this.handleToggle}>
                      Category
                    </Button>
                  </div>
                </Target>
                <Popper
                  placement="bottom-start"
                  eventsEnabled={this.state.open}
                  className={classNames({ [this.state.classes.popperClose]: !this.state.open })}>
                  <ClickAwayListener onClickAway={this.handleClose} >
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