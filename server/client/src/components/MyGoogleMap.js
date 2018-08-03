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
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { url } from '../globals';

const styles = theme => ({	
  input: {	
    margin: theme.spacing.unit,	
  },	
});

class MyGoogleMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: props.classes,
      issues: [],
      diaogOpen: false,
      instructionOpen: false,
      issueDetailOpen: false,
      changeAddressOpen: false,
      issueDetailPresent: '0',
      colorChange: false,
      scroll: 'paper',
      lat: 0,
      lng: 0,
      icon:{ url: 'http://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1'},
      changedLat: 0,
      changedLng: 0,
      address: "",
      City: "",
      County: "",
      State: "",
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      bounds:null,
      userMarkerShown: false,
      onCenterChanged:()=>{},
      onMapMounted:(e)=>{},
      onSearchBoxMounted:(e)=>{},
      onPlacesChanged:()=>{},
      searchBoxDiaOpen: false,
      invalidAddressOpen: false,
    }
  }

  componentWillMount() {
    this.getGeoLocation();
    this.getIssues();
    this.setState({ instructionOpen: true });
    const refs = {}

      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
        },
        onCenterChanged: () => {
          this.setState({
            currentLatLng: {
              lat: refs.map.getCenter().lat(),
              lng: refs.map.getCenter().lng()
            }
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          console.log(places);
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const boxLat = places[0].geometry.location.lat();
          const boxLng = places[0].geometry.location.lng();
         // this.setState({issues: 
          //  this.state.issues.concat({ lat: boxLat, lng: boxLng })});

          this.setState({
            currentLatLng: {
              lat: boxLat,
              lng: boxLng  
            }
          })
          
          this.setState({ 
          address: places[0].formatted_address, 
          lat: boxLat,
          lng: boxLng
          });
         // console.log( places[0].address_components=== undefined);
          if (places[0].address_components === undefined) {
            this.setState({invalidAddressOpen:true});
          } else {
            for (let address of places[0].address_components) {
              for (let level of address.types) {
                if (level === "locality" || level === "sublocality") {
                  this.setState({ City: address.long_name });
                }
                if (level === "administrative_area_level_2") {
                  this.setState({ County: address.long_name });
                }
                if (level === "administrative_area_level_1") {
                  this.setState({ State: address.long_name });
                }
              }
            }
            this.setState({searchBoxDiaOpen: true});
          }

       

          
          
          

        },
      })
  }

  getIssues = _ => {
    fetch(url + '/issues')
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
    for (let issue of this.state.issues) {
      if (issue.issueId.toString() === id) {
        console.log(issue);
        /*this.setState({
          currentLatLng: {
            lat: parseFloat(issue.lat),
            lng: parseFloat(issue.lng)
          }
        })*/
      }
    }
  };

  handleInstructionClose = () => {
    this.setState({ instructionOpen: false });
  };

  handleIssueDetailClose = () => {
    this.setState({ issueDetailOpen: false });
  };

  handleMapClick = (event) => {
    this.setState({issues: this.state.issues.concat({ lat: event.latLng.lat(), lng: event.latLng.lng() })});
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'location': event.latLng }, function (results, status) {
      if (status === 'OK') {
        console.log("user is setting lat:" + event.latLng.lat() + " lng:" + event.latLng.lng());
        console.log("The address is " + results[0].formatted_address);
        console.log(results[0]);
        this.setState({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          address: results[0].formatted_address,
        });

        this.setState({dialogOpen: true});
        
        for (let address of results[0].address_components) {
          for (let level of address.types) {
            if (level === "locality" || level === "sublocality") {
              this.setState({ City: address.long_name });
            }
            if (level === "administrative_area_level_2") {
              this.setState({ County: address.long_name });
            }
            if (level === "administrative_area_level_1") {
              this.setState({ State: address.long_name });
            }
          }
        }
        console.log("State: " + this.state.State + " County: " + this.state.County +
          " City: " + this.state.City);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    }.bind(this));
  }

  handleChangeAddressContinue = () => {
    this.cancelLastMarker();
    this.setState({colorChange: false});
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': this.state.address }, function (results, status) {
      if (status === 'OK') {
        const newLat = parseFloat(results[0].geometry.location.lat());
        const newLng = parseFloat(results[0].geometry.location.lng());
        console.log("return lat is " + newLat);
        console.log("return lng is " + newLng);
    
          this.setState({changedLat: newLat, function(){
             console.log("new lat is " + this.state.changedLat);
          }});
          this.setState({changedLng: newLng, function() {
            console.log("new lng is " + this.state.changedLng);
          }});
         
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }

    }.bind(this));


    this.props.history.push({
      pathname: '/newIssue/',
      state: {
        address: this.state.address,
        State: this.state.State,
        City: this.state.City,
        County: this.state.County,
        lat: this.state.lat,
        lng: this.state.lng,
      },
    });
  };

  handleCancleMarker = () => {
    this.setState({ dialogOpen: false });
    this.cancelLastMarker();
  };

  handleContinueMarker = () => {
    this.props.history.push({
      pathname: '/newIssue/',
      state: {
        address: this.state.address,
        State: this.state.State,
        City: this.state.City,
        County: this.state.County,
        lat: this.state.lat,
        lng: this.state.lng,
      },
    });
  };

  handleChangeAddress = () => {	
    this.setState({changeAddressOpen: true});	
    this.setState({dialogOpen: false});	
  };	
   
  handleIputAddress = (event) => {	
    this.setState({address: event.target.value}, function(){	
      console.log("the inputAddress is " + this.state.address);	
    });	
  };

  cancelLastMarker = () => {
    var newMarkers = [...this.state.issues];	
    newMarkers.splice(this.state.issues.length - 1, 1);	
    this.setState({ issues: newMarkers }); 
  }

  handleCancleChangeAddress = () => {	
    this.setState({changeAddressOpen: false});	
    this.cancelLastMarker();
  }

  handleSearchBoxDiaClose = () => {
    this.setState({searchBoxDiaOpen: false});
  }
  handleInvalidAddressClose = () => {
    this.setState({invalidAddressOpen: false});
  }


  render() {
    return (
      <div>
        <MapWithAMarkerClusterer
          markers={this.state.issues}
          currentLocation={this.state.currentLatLng}
          onMapClick={(e) => this.handleMapClick(e)}
          onMarkerClick={this.handleMarkerClick}
          onMapMounted={this.state.onMapMounted}
          onSearchBoxMounted={this.state.onSearchBoxMounted}
          onCenterChanged={this.state.onCenterChanged}
          bounds={this.state.bounds}
          onPlacesChanged={this.state.onPlacesChanged}
          colorChange={this.state.colorChange}
        />
        <Dialog
          open={this.state.searchBoxDiaOpen}
          onClose={this.handleCancleMarker}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Adding marker to the map?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            We found the place !
            do you wish to submit a ticket for location: {this.state.address}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleSearchBoxDiaClose} color="primary">	            
              Cancle	
            </Button>	
            <Button onClick={this.handleContinueMarker} color="primary" autoFocus>	
              Yes,Please
            </Button>
          </DialogActions>
        </Dialog>
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
              Please click or search places on map to tell us the location of your issue. Clicking on a marker will take you to the
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
          open={this.state.invalidAddressOpen}
          onClose={this.handleInvalidAddressClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Invalid Address"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We failed to identify the address, please select again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleInvalidAddressClose} color="primary" autoFocus>
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
          <DialogTitle id="alert-dialog-title">{"Do you want to make a complaint?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            do you wish to submit a ticket for location: {this.state.address}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleChangeAddress} color="primary">	            
              Change Address	
            </Button>	
            <Button onClick={this.handleContinueMarker} color="primary" autoFocus>	
              Yes, Please	
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog	
          open={this.state.changeAddressOpen}	
          onClose={this.handleCancleChangeAddress}	
          aria-labelledby="alert-dialog-title"	
          aria-describedby="alert-dialog-description"	
        >	
          <DialogTitle id="alert-dialog-title">{"Do you want to change the address?"}</DialogTitle>	
          <DialogContent>	
            <DialogContentText id="alert-dialog-description">	
             New Address: 	
             <Input	
              defaultValue={this.state.address}	
              inputProps={{	
                'aria-label': 'Description',	
              }}	
              onChange = {(e) => this.handleIputAddress(e)}	
              fullWidth = {true}	
            />	
            </DialogContentText>	
          </DialogContent>	
          <DialogActions>	
            <Button onClick={this.handleCancleChangeAddress} color="primary">	
              Cancel	              
            </Button>	 
            <Button onClick={this.handleChangeAddressContinue} color="primary" autoFocus>
             Continue
            </Button>           
          </DialogActions>	          
        </Dialog>

      </div>
    );
  }
}

export default withRouter(MyGoogleMap);




