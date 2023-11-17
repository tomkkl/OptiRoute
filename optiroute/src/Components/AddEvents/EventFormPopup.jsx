import React from 'react';
import EventForm from './EventForm';

const EventFormPopup = ({ onClose }) => {
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <EventForm onClose={onClose} />
      </div>
    </div>
  );
};

export default EventFormPopup;
