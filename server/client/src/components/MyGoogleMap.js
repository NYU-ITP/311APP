import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from 'react';

const testLoc = [
  { latitude: 33.8688, longitude: 151.2093},
  { latitude: 34.4278, longitude: 150.8931},
  { latitude: 34.4792, longitude: 150.4181},
  { latitude: 34.6738, longitude: 150.8444},
  { latitude: 34.8833, longitude: 150.6000},
  { latitude: 34.7479, longitude: 149.7277},

];


class MyGoogleMap extends Component {
  state = {
    locations: testLoc
  }

  render () {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker 
      position = {{lat: -34.397, lng: 150.644 }}
    />
    {this.state.locations.map(location => (
        <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
        />
      ))}

  </GoogleMap>
))
    return (
      <div>
        <MyMapComponent isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
             />
      </div>
    );
  }
}

export default MyGoogleMap;



