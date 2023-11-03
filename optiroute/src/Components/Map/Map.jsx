import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import {useGoogleMap, useLoadScript,} from '@react-google-maps/api'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import GMap from './GMap'
import Home from '../Home/Home'

// useEffect(() => {
//     fetch(`/api/events`)
//       .then(response => response.json())
//       .then(data => {
//         // Filter out any events that have a recurrence value of "No recurrence"
//         const filteredEvents = data.filter(event => moment(event.recurrence).format('MM/DD/YYYY') !== "No recurrence").map(event => ({
//           ...event,
//           id: event._id,
//           title: event.title,
//         }));
//         console.log('Events on current day:', filteredEvents);
//         setMatchedEvents(filteredEvents);
//       })
//       .catch(error => {
//         console.error('Error fetching events with recurrence:', error);
//       });
//   }, [triggerRefresh]);

const Map = () => {
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
            <input id = "name" type='text' placeholder='Name' onChange={handleChangeName}
                value = {name}/>
            <button>
            Create Map
                onClick
            </button>
            <GMap/>
        </div>
    );
}

export default Map