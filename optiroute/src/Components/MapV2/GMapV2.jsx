import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { DirectionsRenderer } from '@react-google-maps/api';

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
      events: this.props.events,
      travelMode: props.travelMode
    };
  }

  componentDidMount() {
    this.calculateAndDisplayRoute();
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events || this.props.travelMode !== prevProps.travelMode) {
      this.setState({ travelMode: this.props.travelMode }, this.calculateAndDisplayRoute);
    }
  }

  calculateAndDisplayRoute() {
    const { events } = this.props;
    const waypoints = events.slice(1, -1).map(event => ({
      location: { lat: event.latitude, lng: event.longitude },
      stopover: true,
    }));

    if (events.length > 1) {
      const origin = events[0];
      const destination = events[events.length - 1];

      const directionsService = new this.props.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new this.props.google.maps.LatLng(origin.latitude, origin.longitude),
          destination: new this.props.google.maps.LatLng(destination.latitude, destination.longitude),
          waypoints: waypoints,
          travelMode: this.state.travelMode,
        },
        (result, status) => {
          if (status === this.props.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }

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
              key={index}
              onClick={this.onMarkerClick}
              position={{ lat: event.latitude, lng: event.longitude }}
              name={event.title}
              label={`${index + 1}`}
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
          {this.state.directions && (
            <DirectionsRenderer
              directions={this.state.directions}
              options={{ suppressMarkers: true }}
            />
          )}
        </Map>
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY'
})(GMap);