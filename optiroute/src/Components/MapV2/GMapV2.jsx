import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { DirectionsRenderer } from '@react-google-maps/api';
import EventList from './EventList';
import moment from 'moment';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import 'react-datepicker/dist/react-datepicker.css';
import './GMap.css'; // Import your CSS file here

const mapStyles = {
  width: '132%',
  height: '90%'
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

  handleMoveEvent = (currEvent, travelTime) => {

    console.log("name")
    currEvent.travelTime = travelTime
    const response =  fetch('/api/events/' + currEvent._id, {
      method: "PATCH",
      body: JSON.stringify(currEvent),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json =  response.json()

    if (response.ok) {
      // setError(null)
      console.log('travel time changed')
      console.log('new travel time: ' + currEvent.travelTime)
    }
  };


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
            const route = result.routes[0]; // Assuming there's only one route
            const legs = route.legs;
            
            // Total duration of the route
            let totalDurationInSeconds = 0;
            let index = 0;
            legs.forEach((leg) => {
              console.log("LEG LENGTH " + events[index]._id +":" + leg.duration.value);
              // handleMoveEvent(events[index], leg.duration.value);
              
              ///UPDATE INFROMATION
              
              events[index].travelTime = leg.duration.value
              events[index].leaveTime = events[index+1].start
              console.log(events[index].start)
              // console.log(events[index].start.getHours())
              // console.log(events[index].start.getMinutes())
              
              //END UPDATE INFORMATION
              
              index++;

              totalDurationInSeconds += leg.duration.value; // Duration in seconds
            });
            //Last event has not travel time
            events[index].travelTime = 0
            events[index].leaveTime = events[index].end
            
            // Convert total duration from seconds to a more readable format (hours and minutes)
            const totalDurationInMinutes = totalDurationInSeconds / 60;
            const hours = Math.floor(totalDurationInMinutes / 60);
            const minutes = Math.round(totalDurationInMinutes % 60);

            // Display or use the duration
            console.log(`Total travel time: ${hours} hours ${minutes} minutes`);
            this.setState({
              directions: result,
              // travelTime: { hours, minutes }
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
      <div className="gmap-container"> {/* Applied gmap-container class */}
        {events && events.length > 0 ? (
          <div className="event-list-container"> {/* Applied event-list-container class */}
            <EventList events={events} />
          </div>
        ) : (
          <div className="no-events-text">No Events For This Day</div>
        )}
        <div className="map-container"> {/* Applied map-container class */}
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            className="google-map"
            initialCenter={{ lat: 40.4237, lng: -86.9212 }}
          >
            {events.map((event, index) => (
              <Marker
                key={index}
                onClick={this.onMarkerClick}
                position={{ lat: event.latitude, lng: event.longitude }}
                name={event.title + ", Start time: " + moment(event.start).format('HH:mm') + ", Leave time: " + moment(event.leaveTime).subtract(moment(event.travelTime), "seconds").format('HH:mm')}
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
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY'
})(GMap);