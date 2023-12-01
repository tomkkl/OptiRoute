import React from 'react';
import moment from 'moment';
import './EventList.css';
import Datetime from "react-datetime";

const EventList = ({ events }) => {


  return (
    <>
      <h2 className="event-list-title">Events For The Day</h2>
      <div className="event-list-scrollable">
        <ul className="event-list">
          {events.map((event, index) => (
            <li key={index} className="event-list-item">
              <span className="event-title">{event.title}</span>
              <span className="event-time">{"Event Start: " + moment(event.start).format('HH:mm')}</span>
              <span className="event-leave-time">{"Leave By: " + moment(event.start).subtract(moment(event.travelTime), "seconds").format('HH:mm')}</span>
              {moment(event.leaveTime).subtract(moment(event.travelTime), "seconds").isBefore(moment(event.start)) ? 
                (<span className="event-time">{" - Warning: Leave time is earlier than the start time!"}</span>) : 
                <span className="event-time">{""}</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventList;
