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
import { renderComponent } from 'recompose';
import { levels } from '../globals';
import Typography from '@material-ui/core/Typography';

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
      marginTop: 30,
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

class Gov extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            classes: props.classes,
            mun_level: '',
            mun_name: '',
            mun_details: [],
            disabled: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.getMunDetails = this.getMunDetails.bind(this);
    }

    // componentWillMount() {
    //     this.getMunDetails();
    // }

    // getIssueDetail = _ => {
    //     fetch('http://localhost:5000/issueDetail/' + this.props.issueId)
    //       .then(response => response.json())
    //       .then(response => this.setState({ issueDetail: response.data }))
    //       .catch(err => console.log(err))
    //   }

    getMunDetails = _ => {
        fetch('http://localhost:5000/munDetails/' + this.state.mun_level)
        .then(response => response.json())
        .then(response => this.setState({mun_details: response.data}))
        .catch(err => console.log(err))
    }

    handleLevelChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.setState({disabled: false});
        this.getMunDetails();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleClose = event => {
        if (this.target1.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    };

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className={this.state.classes.root}>
                    <div className={this.state.classes.container}>
                        <Grid item xs={12}>
                            <FormControl required className={this.state.classes.formControl}>
                            <Typography variant = "subheading">
                                <br/><b>Select the appropriate municipality level:</b>
                            </Typography>
                            {/* <InputLabel htmlFor="mun-helper">Levels</InputLabel> */}
                            <Select
                                name="mun_level"
                                value={this.state.mun_level}
                                onChange={this.handleLevelChange}
                                // required="required"
                                input={<Input name="Municipality Level" id="mun-helper"/>}
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
                            <Typography variant = "subheading">
                                <br/><b>Select the name of your municipality:</b>
                            </Typography>
                            {/* <InputLabel htmlFor="mun-helper">Levels</InputLabel> */}
                            <Select
                                name="mun_name"
                                value={this.state.mun_name}
                                onChange={this.handleChange}
                                // required="required"
                                disabled={this.state.disabled}
                                input={<Input name="Municipality Name" id="munname-helper"/>}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {this.state.mun_details.map(nms =>
                                <MenuItem onClick={this.handleClose} value={nms}>{nms}</MenuItem>
                                )}
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </Grid>
                    </div>
                </div>
            </form>
        );
    }
}



Gov.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Gov);