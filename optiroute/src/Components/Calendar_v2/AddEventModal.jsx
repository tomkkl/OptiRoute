import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import './AddEventModal.css'; // Import your CSS file for modal styling

Modal.setAppElement('#root');

const AddEventModal = ({ isOpen, closeModal, addEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState(-86);
  const [latitude, setLatitude] = useState(40);
  const [autocomplete, setAutocomplete] = useState(null);
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState(''); // State for recurrence field
  const [category, setCategory] = useState(''); // State for category field
  const [notification_time, setNotification_time] = useState(''); // State for category field
  const [startRecur, setStartRecur] = useState('');
  const [endRecur, setEndRecur] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);

  const inputRef = React.createRef();
  //
  const handlePlaceChanged = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      setLongitude(longitude);
      setLatitude(latitude);
      setAddress(place.formatted_address);
    }
  };

  //https://maps.googleapis.com/maps/api/js?key=AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY&libraries=places

  useEffect(() => {
    // Function to load the Google Maps script
    const loadGoogleMapsScript = () => {
      if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onerror = (error) => {
          console.error('Google Maps API script failed to load:', error);
        };
        document.head.appendChild(script);
        return script; // Return the script element for cleanup
      }
      return null; // If the script is already loaded, return null
    };

    // Load the script and keep a reference for cleanup
    const script = loadGoogleMapsScript();

    return () => {
      // Remove the script if it was added
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []); // Empty dependency array means this effect only runs on mount and unmount

  useEffect(() => {
    // Function to initialize the Autocomplete
    const initAutocomplete = () => {
      if (window.google && window.google.maps && inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
        autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));
        setAutocomplete(autocomplete);
      }
    };

    if (isOpen) {
      // Only initialize Autocomplete when the modal is open and the script is loaded
      const timerId = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(timerId);
          initAutocomplete();
        }
      }, 100); // Check every 100ms if Google Maps is loaded

      return () => {
        clearInterval(timerId);
        if (autocomplete) {
          // Remove event listener if the autocomplete is initialized
          window.google.maps.event.clearInstanceListeners(autocomplete);
        }
      };
    }
  }, [isOpen]); // This effect runs when `isOpen` changes


  const handleAddEvent = () => {
    if (title && start && end && location && description && recurrence && category && notification_time) {
      const eventDetails = recurrence === 'No recurrence'
        ? { title, start, end, location, description, recurrence, category, notification_time }
        : { title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur };

      addEvent(eventDetails);
      closeModal();
    } else {
      alert('Please fill out all fields.');
    }
  };

  const recurrenceOptions = ['No recurrence', 'Daily', 'Weekly'];
  useEffect(() => {
    // Fetch category options from the database
    fetch('/api/colors')
      .then(response => response.json())
      .then(data => {
        // Update categoryOptions state with the received categories
        // console.log(data);
        // console.log(data.colorName);
        setCategoryOptions(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Event"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Add Event</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Start Date and Time:</label>
        <Datetime
          value={start}
          onChange={(date) => setStart(date)}
          inputProps={{ placeholder: 'Select Start Date and Time' }}
        />
        <label>End Date and Time:</label>
        <Datetime
          value={end}
          onChange={(date) => setEnd(date)}
          inputProps={{ placeholder: 'Select End Date and Time' }}
        />
        <label>Notification Date and Time:</label>
        <Datetime
          value={notification_time}
          onChange={(date) => setNotification_time(date)}
          inputProps={{ placeholder: 'Select Notification Date and Time' }}
        />
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <label>Address:</label>
        <div>
          <input type="text" ref={inputRef} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Recurrence:</label>
          <select className="select-field" value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
            <option value="">Select Recurrence</option>
            {recurrenceOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Recurring Date:</label>
          {/* Disable the input field when "No recurrence" is selected */}
          <Datetime
            value={startRecur}
            onChange={(date) => setStartRecur(date)}
            inputProps={{ placeholder: 'Select Date', disabled: recurrence === 'No recurrence' }}
          />
        </div>
        <div>
          <label>End Recurring Date:</label>
          {/* Disable the input field when "No recurrence" is selected */}
          <Datetime
            value={endRecur}
            onChange={(date) => setEndRecur(date)}
            inputProps={{ placeholder: 'Select Date', disabled: recurrence === 'No recurrence' }}
          />
        </div>
        <div>
          <label>Category:</label>
          <select className="select-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categoryOptions.length > 0 ? (
              categoryOptions.map(option => (
                <option key={option.id} value={option.colorName}>
                  {option.colorName}
                </option>
              ))
            ) : (
              <option value="" disabled>No Category added</option>
            )}
          </select>
        </div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleAddEvent}>Add Event</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AddEventModal;