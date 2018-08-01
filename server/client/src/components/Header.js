import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ( {
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      classes: props.classes,
      disabled: true
    }
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.history.push({
      pathname: '/govSelect/',
    });
  }

  render() {
    return (
      <div className={this.state.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={this.state.classes.flex}>
              311
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


  Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

