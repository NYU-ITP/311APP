import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";



class HomePage extends Component {
  state = {
    issues: []
  }

  componentDidMount() {
    this.getIssues();
  }

  // AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4

  getIssues = _ => {
    fetch('http://localhost:5000/issues')  
      .then(response => response.json()) 
      .then(response => this.setState({ issues: response.data}))
      .catch(err => console.log(err))
  }

  // renderIssues = ({issuesId, location}) => <div key={issueId}>{location}</div>
  render() {
      const { issues } = this.state;
      const MyGoogleMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))
      
      return (
          <div>
            Welcome to the 311 HomePage
            <ul>
              {this.state.issues.map(issue =>
              <li>
                  <h2>{issue.issueId}</h2>
                  <p>{issue.location}</p>
              </li>)}
            </ul>
            <MyGoogleMap isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjFZnvXXlS5OXSbKSpLRSD-c6dFdsplo4&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
             />
           
          </div>
      );

  }
}

export default HomePage;