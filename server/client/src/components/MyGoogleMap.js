
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Route , withRouter} from 'react-router-dom';
import { History } from 'history';
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const testLoc = [
  { latitude: -34.397, longitude: 150.644 },
  { latitude: -34.4278, longitude: 150.8931},
  { latitude: -34.4792, longitude: 150.4181},
  { latitude: -34.6738, longitude: 150.8444},
  { latitude: -34.8833, longitude: 150.6000},
  { latitude: -34.7479, longitude: 149.7277},

];

const MapWithAMarkerClusterer = compose(
  withProps({
    
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4&v=3.exp&libraries=geometry,drawing,places",
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
    center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
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
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);



class MyGoogleMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers:testLoc ,
      diaogOpen: false,
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
      
      markers: this.state.markers.concat({ latitude: event.latLng.lat(), longitude: event.latLng.lng()})
    });
    this.setState({ dialogOpen: true });
    
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleCancleMarker = () => {
    this.setState({ dialogOpen: false });
    var newMarkers = [...this.state.markers];
    console.log(this.state.markers.length);
    newMarkers.splice(this.state.markers.length - 1, 1);
    this.setState({markers: newMarkers});  
    console.log(this.state.markers.length);
  };

  handleContinue = () => {
    this.setState({ dialogOpen: false });
    this.props.history.push('/newIssue/');
  };


  componentWillMount() {
    this.getGeoLocation()
  }

  render () {
    return (
      <div>
      <MapWithAMarkerClusterer 
      markers={this.state.markers} 
      currentLocation = {this.state.currentLatLng} 
      onMapClick = {(e) => this.handleMapClick(e)} 
     />
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
              Cancle
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



