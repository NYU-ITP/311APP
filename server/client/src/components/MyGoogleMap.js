
import React from 'react';
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
      currentLatLng: {
        lat: 0,
        lng: 0
      }
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
  componentWillMount() {
    this.getGeoLocation()
  }

  render () {
    return (
      <div>
      <MapWithAMarkerClusterer 
      markers={this.state.markers} 
      currentLocation = {this.state.currentLatLng} 
     />
      </div>
      
    );
  }
}

export default MyGoogleMap;



