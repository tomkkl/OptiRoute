import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onClose }) => {
  const [eventData, setEventData] = useState({
    name: '',
    location: '',
    address: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    repeat: 'none', // Default value for repeat option (no repeat)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For datetime-local inputs, format the date and time strings properly
    if (name === 'startDateTime' || name === 'endDateTime') {
      // Convert the input value to a format accepted by datetime-local inputs
      const formattedDateTime = new Date(value).toISOString().slice(0, 16);
      setEventData({ ...eventData, [name]: formattedDateTime });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleSaveClick = () => {
    // Save eventData to MongoDB (You might use an API call here)
    onClose(eventData); // Passes new event data back to the parent component
  };

  return (
    <div className='event-form'>
      <label>
        Event Name:
        <input type='text' name='name' value={eventData.name} onChange={handleInputChange} />
      </label>
      <label>
        Location:
        <input type='text' name='location' value={eventData.location} onChange={handleInputChange} />
      </label>
      <label>
        Address:
        <input type='text' name='address' value={eventData.address} onChange={handleInputChange} />
      </label>
      <label>
        Start:
        <input type="datetime-local" value={eventData.startDateTime} onChange={handleInputChange}/>
      </label>
      <label>
        End:
        <input type="datetime-local" value={eventData.endDateTime} onChange={handleInputChange}/>
      </label>
      <label>
        Repeat:
        <select name='repeat' value={eventData.repeat} onChange={handleInputChange}>
          <option value='none'>No Repeat</option>
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
        </select>
      </label>
      <label>
        Description:
        <textarea name='description' value={eventData.description} onChange={handleInputChange} />
      </label>

      <div className='button-container'>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={() => onClose(null)}>Cancel</button>
      </div>
    </div>
  );
};

export default EventForm;
