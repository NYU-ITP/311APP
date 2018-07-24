
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import IssueDetail from './IssueDetail';
import MapWithAMarkerClusterer from './MapWithAMarkerClusterer';

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
      issueDetailPresent: '0',
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

  componentWillMount() {
    this.getGeoLocation();
    this.getIssues();
    this.setState({ instructionOpen: true });
  }

  getIssues = _ => {
    fetch('http://localhost:5000/issues')
      .then(response => response.json())
      .then(response => this.setState({ issues: response.data }))
      .catch(err => console.log(err))
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

  handleMarkerClick = (id) => {
    console.log("marker clicked is " + id);
    this.setState({ issueDetailPresent: id });
    this.setState({ issueDetailOpen: true });

  };

  handleInstructionClose = () => {
    this.setState({ instructionOpen: false });
  };

  handleIssueDetailClose = () => {
    this.setState({ issueDetailOpen: false });
  };

  handleMapClick = () => {
    this.setState({ dialogOpen: true });
  }

  handleCancleMarker = () => {
    this.setState({ dialogOpen: false });
    var newMarkers = [...this.state.issues];
    newMarkers.splice(this.state.issues.length - 1, 1);
    this.setState({ issues: newMarkers });
  };

  handleContinueMarker = (event) => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'location': event.latLng }, function (results, status) {
      if (status === 'OK') {
        console.log("user is setting lat:" + event.latLng.lat() + " lng:" + event.latLng.lng());
        console.log("The address is " + results[0].formatted_address);
        console.log(results[0]);
        this.setState({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          issues: this.state.issues.concat({ lat: event.latLng.lat(), lng: event.latLng.lng() }),
          address: results[0].formatted_address,
          dialogOpen: false,
        });
        
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
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    }.bind(this));

    this.props.history.push({
      pathname: '/newIssue/',
      state: {
        address: this.state.address,
        stateUs: this.state.stateUs,
        cityUs: this.state.cityUs,
        countyUs: this.state.countyUs,
        lat: this.state.lat,
        lng: this.state.lng,
      },
    });
  };

  render() {
    return (
      <div>
        <MapWithAMarkerClusterer
          markers={this.state.issues}
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
              <IssueDetail issueId= {this.state.issueDetailPresent}/>
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
              Please click on map to tell us the location of your issue. Clicking on a marker will take you to the
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
          onClose={this.handleCancleMarker}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Adding marker to the map?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The marker indicates the location of your issue to be reported. You can continue to tell us more
              about what happened.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancleMarker} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleContinueMarker} color="primary" autoFocus>
              Next
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    );
  }
}

export default withRouter(MyGoogleMap);




