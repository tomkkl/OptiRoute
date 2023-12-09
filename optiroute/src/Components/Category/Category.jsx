import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventDetailModal from "../Calendar_v2/EventDetailsModal";
import './Category.css';

function Category() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    fetch(`/api/events?category=${category}`)
      .then(response => response.json())
      .then(data => {
        const eventsWithId = data.filter(event => event.category === category).map(event => ({
          ...event,
          id: event._id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          location: event.location,
          recurrence: event.recurrence,
          description: event.description,
          category: event.category,
        }));
        setMatchedEvents(eventsWithId);
      })
      .catch(error => {
        console.error('Error fetching matched events:', error);
      });
  }, [category, triggerRefresh]);

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
      <h1>Search Results for: <span>{category}</span></h1>
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

export default Category;
