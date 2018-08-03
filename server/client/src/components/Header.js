import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavigationArrowBack from '@material-ui/icons/ArrowBack'
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
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
  }

  // When back button is clicked
  handleNavigationClick = () => {
    let pathname = this.props.location.pathname;
    console.log(this.props.history);
    this.props.history.goBack();
    // if (pathname.startsWith('/matches/')) {
    //   this.props.history.replace('/');
    // } else {
    //   this.props.history.goBack();
    // }
  };

  handleGovClick = () => {
    this.props.history.push({
      pathname: '/govSelect/',
    });
  };

  render() {
    return (
      <div className={this.state.classes.root}>
        <AppBar position="static">
          <Toolbar>
            {
              this.props.location.pathname === '/' ?
                <IconButton className={this.state.classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                :
                <IconButton>
                  <NavigationArrowBack style={{ color: 'white' }} onClick={this.handleNavigationClick} />
                </IconButton>
            }
            <Typography variant="title" color="inherit" className={this.state.classes.flex}>
              311
            </Typography>

            <Button variant="contained" color="primary" className={this.state.classes.button} onClick= {this.handleGovClick}>Municipality
            </Button>
            <Button variant="contained" color="primary" className={this.state.classes.button}>Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));

