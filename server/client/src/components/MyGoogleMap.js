
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import IssueDetail from './IssueDetail';
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const testLoc = [
  { latitude: 40.732086575353854, longitude: -73.98798983538211 },
  { latitude: 40.73223291482773, longitude: -73.99138014757693 },
  { latitude: 40.732736970551905, longitude: -74.0021089836365 },
  { latitude: 40.73181015546955, longitude: -74.00307457888186 },
  { latitude: 40.72836294045953, longitude: -74.00288145983279 },
  { latitude: 40.73148495413541, longitude: -73.99487774813235 },
  { latitude: 40.73211909526478, longitude: -73.99861138308108 },
  { latitude: 40.725925340669626, longitude: -73.99736166000366 },
  { latitude: 40.72623273248103, longitude: -73.99440567934573 },
  { latitude: 40.72844424475662, longitude: -73.99970572435916 },
  { latitude: 40.730037788925166, longitude: -73.99934094393313 },
  { latitude: 40.72963127618141, longitude: -74.00217335665286 },
  { latitude: 40.72849302728718, longitude: -74.00414746248782 },
  { latitude: 40.727712502506876, longitude: -74.00373976671756 },
  { latitude: 40.727631197315795, longitude: -74.00380413973392 },

];

const MapWithAMarkerClusterer = compose(
  withProps({

    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `510px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={16}
    center={{ lat: 40.73136253622127 , lng: -73.99699021534423 }}
    onClick={props.onMapClick}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={props.onMarkerClick}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

const styles = theme => ({
  container: {
    maxWidth: 700,
    marginTop: 20,
    margin: "auto"
  },
  center: {
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperHeading: {
    fontSize: 20,
    fontWeight: 1000,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class MyGoogleMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: props.classes,
      issues: [],
      markers: testLoc,
      diaogOpen: false,
      instructionOpen: false,
      issueDetailOpen: false,
      scroll: 'paper',
      lat: 0,
      lng: 0,
      address: "",
      cityUs: "",
      countyUs: "",
      stateUs: "",
      currentLatLng: {
        lat: 0,
        lng: 0
      },

      userMarkerShown: false
    }
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("User's position is lat :" + position.coords.latitude + "; lng: " + position.coords.longitude);
          this.setState(prevState => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }))
        }
      )
    } else {
      error => console.log(error)
    }
  }

  handleMapClick = (event) => {
    console.log("user is setting lat:" + event.latLng.lat() + " lng:" + event.latLng.lng());
    this.setState({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    this.setState({

      markers: this.state.markers.concat({ latitude: event.latLng.lat(), longitude: event.latLng.lng() })
    });
    this.setState({ dialogOpen: true });

    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'location': event.latLng }, function (results, status) {
      if (status === 'OK') {
        const geoResult = results[0];
        console.log("The address is " + results[0].formatted_address);
        this.setState({ address: results[0].formatted_address });
        console.log(geoResult);
        for (let address of results[0].address_components) {
          for (let level of address.types) {
            if (level === "locality" || level === "sublocality") {
              this.setState({ cityUs: address.long_name });
            }
            if (level === "administrative_area_level_2") {
              this.setState({ countyUs: address.long_name });
            }
            if (level === "administrative_area_level_1") {
              this.setState({ stateUs: address.long_name });
            }
          }
        }
        console.log("State: " + this.state.stateUs + " County: " + this.state.countyUs +
          " City: " + this.state.cityUs);
        console.log(" Test geeting issues : " + this.state.issues[7].lat);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    }.bind(this));
  }

  handleMarkerClick = () => {
    console.log("marker clicked");
    this.setState({ issueDetailOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleInstructionClose = () => {
    this.setState({ instructionOpen: false });
  };

  handleIssueDetailClose = () => {
    this.setState({ issueDetailOpen: false });
  };

  handleCancleMarker = () => {
    this.setState({ dialogOpen: false });
    var newMarkers = [...this.state.markers];
    newMarkers.splice(this.state.markers.length - 1, 1);
    this.setState({ markers: newMarkers });
  };

  handleContinue = () => {
    this.setState({ dialogOpen: false });
    this.props.history.push({
      pathname: '/newIssue/',
      state: {
        address: this.state.address,
        cityUs: this.state.cityUs,
        lat: this.state.lat,
        lng: this.state.lng,
        countyUs: this.state.countyUs,
        stateUs: this.state.stateUs
      },
    });
  };


  componentWillMount() {
   //  this.getGeoLocation();
    this.getIssues();
    this.setState({ instructionOpen: true });
  }

  getIssues = _ => {
    fetch('http://localhost:5000/issues')
      .then(response => response.json())
      .then(response => this.setState({ issues: response.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <MapWithAMarkerClusterer
          markers={this.state.markers}
          currentLocation={this.state.currentLatLng}
          onMapClick={(e) => this.handleMapClick(e)}
          onMarkerClick={this.handleMarkerClick}
        />
        <Dialog
          open={this.state.issueDetailOpen}
          onClose={this.handleIssueDetailClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">IssueDetail</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <IssueDetail issueId='1'/>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.instructionOpen}
          onClose={this.handleinstructionClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to make a complaint?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please click on map to tell us the location of your issue. Click on marker will take you to the
              existing issue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleInstructionClose} color="primary" autoFocus>
              Ok, Got it !
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Adding marker to the map?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The marker indicates the location of your issue to be reported. You can continue to tell us more
              about what happeed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancleMarker} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleContinue} color="primary" autoFocus>
              Next
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    );
  }
}



export default withRouter(MyGoogleMap);




