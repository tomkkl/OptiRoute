import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import {useGoogleMap, useLoadScript,} from '@react-google-maps/api'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';

import GMap from './GMap'
import Home from '../Home/Home'

// // useEffect(() => {
//     // fetch(`/api/events`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Filter out any events that have a recurrence value of "No recurrence"
    //     const filteredEvents = data.filter(event => moment(event.recurrence).format('MM/DD/YYYY') !== "No recurrence").map(event => ({
    //       ...event,
    //       id: event._id,
    //       title: event.title,
    //     }));
    //     console.log('Events on current day:', filteredEvents);
    //     setMatchedEvents(filteredEvents);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching events with recurrence:', error);
    //   });
//   });

const Map = () => {
    const [showMap, setShowMap] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState('');
    const myObject = {
        events: "filteredEvents",
      };
    const handleClick = () => {
        fetch(`/api/events`)
//         .then(response => response.json())
//         .then(data => {
//           // Filter out any events that have a recurrence value of "No recurrence"
//           const filteredEvents = data.filter(event => moment(event.start).format('MM/DD/YYYY') == moment(chosenDate).format('MM/DD/YYYY')).map(event => ({
//             ...event,
//             longitude: event.longitude,
            latitude: event.latitude,
//             title: event.title,
//           }));
//           console.log('Events on current day:', filteredEvents.title);
          if(filteredEvents[0] == null){
            console.log("NULL")
            setShowMap(false);
          } else {
            setFilteredEvents(filteredEvents);
            setShowMap(true);
//           }
          //setMatchedEvents(filteredEvents);
//         })
//         .catch(error => {
//           console.error('Error fetching events with recurrence:', error);
//         });
//       };
    const [name, setName] = useState('');
    const handleChangeName = event => {
        setName(event.target.value);
    };

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: "AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY"
    //   })
    
    const [chosenDate, setChosenDate] = useState(new Date());
    return (
        <div>
            <div>
                <label className="label">Chose Date:</label>
                <Datetime value={chosenDate} onChange={(date) => setChosenDate(date)} />
            </div>
            <button
            onClick={handleClick}>
                Create Map
            </button>
            {showMap ?( <GMap events={filteredEvents}/>) : <text>NO EVENTS on current day</text>}
            
        </div>
    );
}

export default Map