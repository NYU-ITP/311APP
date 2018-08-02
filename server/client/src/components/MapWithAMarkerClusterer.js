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
const defaultIcon = {
  url: 'http://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1', // url
  // scaledSize: new window.google.maps.Size(20, 30), // scaled size
};
const blueIcon = {
  url:  'https://mt.google.com/vt/icon/name=icons/spotlight/spotlight-waypoint-blue.png&ax=44&ay=48&scale=1', // url
  // scaledSize: new window.google.maps.Size(20, 30), // scaled size
};



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
    ref={props.onMapMounted}
    defaultZoom={16}
    center={{ lat: props.currentLocation.lat || 40.73136253622127, lng: props.currentLocation.lng || -73.99699021534423 }}
    onClick={props.onMapClick}
    onCenterChanged={props.onCenterChanged}
  >
  <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search Places"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    
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