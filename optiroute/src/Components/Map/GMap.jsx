import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

//https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class GMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      events: this.props.events, // Now using the events passed from the parent component
    };
  }

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const { events } = this.state;
    console.log(events);

    return (
      <>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={
            {
              lat: 40.4237,
              lng: -86.9212
            }
          }
        >
          {events.map((event, index) => (
          <Marker
            key={index} // Assuming each event is unique, you could use a unique property of event as a key
            onClick={this.onMarkerClick}
            position={{ lat: event.latitude, lng: event.longitude }} // Replace with actual event latitude and longitude
            name={event.title} // Replace with actual event name or any other property
          />
        ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY'
})(GMap);