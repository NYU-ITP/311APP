import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from 'react';

class MyGoogleMap extends Component {
  render () {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
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



