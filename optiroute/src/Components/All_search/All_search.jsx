import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDetailModal from "../Calendar_v2/EventDetailsModal";
import './styles.css'; // Import the CSS file
import './search.css'; // Import the CSS file
import { ReactSession } from "react-client-session"


function All_search() {
  const [category, setCategory] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const recurrenceOptions = ['No recurrence', 'Daily', 'Weekly'];
  const navigate = useNavigate();

  const navigateToCalendar = () => {
    navigate('/calendar');
  };

  useEffect(() => {
    fetch('/api/colors')
      .then(response => response.json())
      .then(data => {
        const userId = ReactSession.get("user_id");
        const filteredData = data.filter((event) => event.user_id === userId);
        const colorNames = filteredData.map((event) => event.colorName);
        setCategoryOptions(colorNames);
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount


  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        const userId = ReactSession.get("user_id");
        const userEvents = data.filter((event) => event.user_id === userId);
        let filteredEvents = userEvents;

        // Apply filters
        if (category) {
          filteredEvents = filteredEvents.filter(event => event.category.toLowerCase().includes(category.toLowerCase()));
        }
        if (recurrence) {
          filteredEvents = filteredEvents.filter(event => event.recurrence.toLowerCase().includes(recurrence.toLowerCase()));
        }
        if (title) {
          filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (startDate) {
          filteredEvents = filteredEvents.filter(event => new Date(event.start) >= new Date(startDate));
        }

        // Update matchedEvents state with filtered events
        setMatchedEvents(filteredEvents.map(event => ({
          ...event,
          id: event._id,
          start: new Date(event.start),
          end: new Date(event.end),
        })));
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [category, recurrence, title, triggerRefresh]);

  const handleDelete = () => {
    if (selectedEvent.id) {
      fetch(`/api/events/${selectedEvent.id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setSelectedEvent(null);
            setTriggerRefresh(t => !t);
          } else {
            console.error('Error deleting event:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    }
  };

  const updateEvent = ({ id, title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur }) => {
    fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur }),
    })
      .then((response) => response.json())
      .then((updatedEvent) => {
        console.log('Event updated successfully:', updatedEvent);
        const updatedEvents = matchedEvents.map((event) => (event.id === id ? updatedEvent : event));
        setMatchedEvents(updatedEvents);
        setSelectedEvent(null);
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };

  // Sort the matched events by start date/time
  const sortedEvents = matchedEvents.sort((a, b) => a.start - b.start);

  return (
    <div className="search-results-container">
      <h1>Filter Events</h1>
      <div className="filter-form">
        <div className="form-group">
          <label className="filter-label">Title:</label>
          <input type="text" className="filter-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="filter-label">Category:</label>
          <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categoryOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="filter-label">Recurrence:</label>
          <select className="filter-select" value={recurrence} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Recurrence</option>
            {recurrenceOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="filter-label">Start Date:</label>
          <input type="date" className="filter-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="filter-button" onClick={navigateToCalendar}>Back To Calendar</button>
        </div>
      </div>
      <h1>Search Results:</h1>
      <div className="events-list">
        {sortedEvents.map(event => (
          <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
            <span>{event.title}</span>
            <span className="event-card-date">{event.start.toDateString()}</span>
          </div>
        ))}
      </div>
      <EventDetailModal
        isOpen={Boolean(selectedEvent)}
        closeModal={() => {
          setSelectedEvent(null);
          setTriggerRefresh(t => !t);
        }}
        event_id={selectedEvent?.id}
        onEdit={updateEvent}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default All_search;
