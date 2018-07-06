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
  { latitude: -33.8688, longitude: 151.2093},
  { latitude: -34.4278, longitude: 150.8931},
  { latitude: -34.4792, longitude: 150.4181},
  { latitude: -34.6738, longitude: 150.8444},
  { latitude: -34.8833, longitude: 150.6000},
  { latitude: -34.7479, longitude: 149.7277},

];

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
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
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
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



class MyGoogleMap extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: testLoc })
  }

  render () {
    return (
      <div>
      <MapWithAMarkerClusterer markers={this.state.markers} />
      </div>
      
    );
  }
}

export default MyGoogleMap;



