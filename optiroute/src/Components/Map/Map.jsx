import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import { useGoogleMap, useLoadScript, } from '@react-google-maps/api'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
import Weather from './Weather'

import GMap from './GMap'
import EventList from './EventList';
import Home from '../Home/Home'
import './Map.css';

const Map = () => {
    // deprecate this
    const [travelMode, setTravelMode] = useState('DRIVING');

    const [showMap, setShowMap] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState('');
    const [mapKey, setMapKey] = useState(0); // New state for map key

    const handleChangeTravelMode = (event) => { // Add this function
        setTravelMode(event.target.value.toUpperCase());
    };

    const handleClick = () => {
        fetch(`/api/events`)

            .then(response => response.json())
            .then(data => {
                // Filter out any events that have a recurrence value of "No recurrence"
                let filteredEvents = data.filter(event => moment(event.start).format('MM/DD/YYYY') == moment(chosenDate).format('MM/DD/YYYY')).map(event => ({
                    ...event,
                    longitude: event.longitude,
                    latitude: event.latitude,
                    title: event.title,
                }));
                filteredEvents = filteredEvents.sort((a, b) => moment(a.start) - moment(b.start));

                console.log('Events on current day:', filteredEvents.map(event => event.title));
                if (filteredEvents.length === 0) {
                    console.log("NULL");
                    setShowMap(false);
                } else {
                    setFilteredEvents(filteredEvents);
                    setShowMap(true);
                    setMapKey(prevKey => prevKey + 1); // Update the key to reload GMap
                }
            })
            .catch(error => {
                console.error('Error fetching events with recurrence:', error);
            });
    };

    const [chosenDate, setChosenDate] = useState(new Date());
    const firstEventLocation = filteredEvents && filteredEvents.length > 0 ? filteredEvents[0] : null;


    return (
        <div className="map-page-container">
            <div className="event-list-sidebar">
                <div className="date-picker-container">
                    <label htmlFor="date-picker" className="label">Choose Date:</label>
                    <Datetime
                        id="date-picker"
                        value={chosenDate}
                        onChange={(date) => setChosenDate(date)}
                        closeOnSelect
                    />
                </div>
    
                {/* Travel Mode Dropdown */}
                <div className="travel-mode-container">
                    <label htmlFor="travel-mode">Travel Mode:</label>
                    <select id="travel-mode" value={travelMode} onChange={handleChangeTravelMode}>
                        <option value="DRIVING">Driving</option>
                        <option value="WALKING">Walking</option>
                        <option value="BICYCLING">Biking</option>
                    </select>
                </div>
    
                <div className="create-map-button-container">
                    <button className="create-map-button" onClick={handleClick}>
                        Create Map
                    </button>
                </div>

                {firstEventLocation &&
                    <Weather
                        latitude={firstEventLocation.latitude}
                        longitude={firstEventLocation.longitude}
                    />
                }
    
                {!showMap && <div className="no-events-text">No Events For This Day</div>}
                {showMap && <EventList events={filteredEvents} />}
            </div>
            <div className="map-container">
                {showMap && <GMap key={mapKey} events={filteredEvents} travelMode={travelMode} />}
            </div>
        </div>
    );
    
}

export default Map;