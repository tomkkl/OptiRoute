import React from 'react';
import moment from 'moment';
import './EventList.css';

const EventList = ({ events }) => {
  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Events For The Day</h2>
      <ul className="event-list">
        {events.map((event, index) => (
          <li key={index} className="event-list-item">
            <span className="event-title">{event.title}</span>
            <span className="event-time">{moment(event.start).format('HH:mm:ss')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
