import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import { useGoogleMap, useLoadScript, } from '@react-google-maps/api'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
import Weather from './Weather'
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import GMap from './GMapV2'
import EventList from './EventList';
import Home from '../Home/Home'
import './MapV2.css';

Modal.setAppElement('#root');

const Map = () => {
    // deprecate this

    const navigate = useNavigate();
    const userId = ReactSession.get('user_id');
    const [travelMode, setTravelMode] = useState('DRIVING');

    const [showMap, setShowMap] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState('');
    const [mapKey, setMapKey] = useState(0); // New state for map key

    const [savedRoutes, setSavedRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [routeName, setRouteName] = useState('');

    const handleChangeTravelMode = (event) => { // Add this function
        setTravelMode(event.target.value.toUpperCase());
    };

    const openSaveRouteModal = () => {
        setIsModalOpen(true);
    };

    const handleRouteNameChange = (e) => {
        setRouteName(e.target.value);
    };

    // Event handlers for route operations
    const handleSaveRoute = () => {
        if (!routeName.trim()) {
            // Prompt the user to enter a route name if not entered
            openSaveRouteModal();
            return; // Exit the function to wait for user input
        }

        const routeData = {
            user_id: userId,
            name: routeName,
            travelMode: travelMode,
            waypoints: filteredEvents.map(event => ({
                latitude: event.latitude,
                longitude: event.longitude,
                title: event.title,
                time: event.start
            }))
        };

        fetch('/api/routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routeData),
        })
            .then(response => response.json())
            .then(data => {
                setSavedRoutes([...savedRoutes, data]);
                setSelectedRoute(data._id);
                setIsModalOpen(false);
                setRouteName('');
                console.log('Route saved:', data);
            })
            .catch((error) => {
                console.error('Error saving route:', error);
            });
    };

    const handleLoadRoute = () => {
        let routeIdToLoad = selectedRoute;

        if (!selectedRoute && savedRoutes.length > 0) {
            // If no route is selected, use the name of the first saved route
            routeIdToLoad = savedRoutes[0]._id;
            console.log("Loading most recent route:", routeIdToLoad);
        }

        fetch(`/api/routes`) // Fetch all routes
            .then(response => response.json())
            .then(allRoutes => {
                // Find the route by name
                const routeToLoad = allRoutes.find(route => route._id === routeIdToLoad);
                if (routeToLoad) {
                    setFilteredEvents(routeToLoad.waypoints.map(waypoint => ({
                        ...waypoint,
                        start: new Date(waypoint.time) // Parse the time correctly
                    })));
                    setTravelMode(routeToLoad.travelMode);
                    setShowMap(true);
                    setMapKey(prevKey => prevKey + 1);
                    console.log('Route loaded:', routeToLoad);
                } else {
                    console.error('Route not found:', routeIdToLoad);
                }
            })
            .catch((error) => {
                console.error('Error loading route:', error);
            });
    };


    const handleDeleteRoute = () => {
        let routeIdToDelete = selectedRoute;
    
        // If no route is selected and there are saved routes, use the ID of the first saved route
        if (!selectedRoute && savedRoutes.length > 0) {
            routeIdToDelete = savedRoutes[0]._id;
        }
    
        fetch(`/api/routes/${routeIdToDelete}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => {
                const updatedRoutes = savedRoutes.filter(route => route._id !== routeIdToDelete);
                setSavedRoutes(updatedRoutes);
    
                // Update selectedRoute to the next available route or empty if none
                setSelectedRoute(updatedRoutes.length > 0 ? updatedRoutes[0]._id : '');
                console.log('Route deleted');
            })
            .catch((error) => {
                console.error('Error deleting route:', error);
            });
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

    useEffect(() => {
        fetch(`/api/routes`) // Fetch all routes
            .then(response => response.json())
            .then(allRoutes => {
                const userRoutes = allRoutes.filter(route => route.user_id === userId);
                setSavedRoutes(userRoutes);

                if (userRoutes.length > 0) {
                    // Set the selected route to the most recent route's ID
                    setSelectedRoute(userRoutes[userRoutes.length - 1]._id);
                }
            })
            .catch(error => {
                console.error('Error fetching routes:', error);
            });
    }, [userId]);




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

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2>Save Route</h2>
                    <input
                        type="text"
                        placeholder="Enter route name"
                        value={routeName}
                        onChange={handleRouteNameChange}
                        className="route-name-input"
                    />
                    <button onClick={handleSaveRoute} className="save-route-button">Save</button>
                </Modal>

                {/* Route Management */}
                <div className="route-management-container">
                    <label htmlFor="saved-routes">Saved Routes:</label>
                    <select
                        id="saved-routes"
                        value={selectedRoute}
                        onChange={e => setSelectedRoute(e.target.value)}
                    >
                        {savedRoutes.map(route => (
                            <option key={route._id} value={route._id}>{route.name}</option>
                        ))}
                    </select>

                    <div className="route-buttons-container">
                        <button onClick={handleLoadRoute}>Load Route</button>
                        <button onClick={handleSaveRoute}>Save Route</button>
                        <button onClick={handleDeleteRoute}>Delete Route</button>
                    </div>
                </div>

                {firstEventLocation &&
                    <Weather
                        latitude={firstEventLocation.latitude}
                        longitude={firstEventLocation.longitude}
                    />
                }

                {!showMap && <div className="no-events-text">No Events For This Day</div>}

                <div className="create-map-button-container">
                    <button className="create-map-button" onClick={() => { navigate("/calendar") }}>
                        Back To Calendar
                    </button>
                </div>
                
            </div>
            <div className="map-container">
                {showMap && <GMap key={mapKey} events={filteredEvents} travelMode={travelMode} />}
            </div>
        </div>
    );

}

export default Map;