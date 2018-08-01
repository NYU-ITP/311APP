import React from 'react';
const _ = require("lodash");
const { compose, withProps, withHandlers , lifecycle} = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const mapHeight = window.innerHeight

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `${mapHeight}px` }} />,
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
    center={{ lat: props.currentLocation.lat || 40.73136253622127, lng: props.currentLocation.lng || -73.99699021534423 }}
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
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          onClick={() => props.onMarkerClick(marker.issueId.toString())}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

export default MapWithAMarkerClusterer;