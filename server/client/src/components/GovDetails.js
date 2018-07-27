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
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

class GovDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            classes: props.classes,
            mun_level: '',
            mun_name: '',
            issues_list: [],
            keys: [],
        }
    }

    get_vals = _ => {
        this.state.mun_level = this.props.history.location.state.mun_level;
        this.state.mun_name = this.props.history.location.state.mun_name;
    }

    get_issues_mun = _ => {
        let postData = {
            mun_level: this.state.mun_level,
            mun_name: this.state.mun_name
        };
        fetch('http://localhost:5000/api/issuesMun', {
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
            // this.setState({issues_list: data});
            // this.state.issues_list = Object.entries(data);
            this.state.issues_list = data;
            // console.log(this.state.issues_list[1]);
            for (var i in this.state.issues_list) {
                if (!this.state.issues_list.hasOwnProperty(i)) {
                    continue;
                }
                console.log(i);
                console.log(this.state.issues_list[i]); 
            }
        })
        .catch(err => {
            console.log(err);
        });
        // fetch('http://localhost:5000/munDetails/' + this.state.mun_level + '/' + this.state.mun_name.replace(/\s/g,''))
        // .then(response => response.json())
        // .then(response => this.setState({ issues_list: response.data }))
        // .then(response => console.log(response.data))
        // .catch(err => console.log(err))
    }

    componentWillMount() {
        this.get_vals();
        this.get_issues_mun();
    }

    render() {
        return(
            <div>
                {this.state.issues_list["data"]}
                <List>
                <ListItem> HI
                    </ListItem>
                    {this.state.issues_list.map(issue => 
                    <ListItem> 
                        {issue}
                        HI
                    </ListItem>
                    )}
                    
                </List>
            </div>
        );
    }
}

GovDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(GovDetails);