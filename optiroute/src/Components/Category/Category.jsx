import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventDetailModal from "../Calendar_v2/EventDetailsModal";
import './Category.css';


function Category() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams)
  const category = searchParams.get('category');
  console.log("hiiii")
  console.log('Category in useEffect:', category); 

  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    console.log('Category in useEffect:', category); 
    fetch(`/api/events?category=${category}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
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
        console.log('Events matched:', eventsWithId);
        setMatchedEvents(eventsWithId);
      })
      .catch(error => {
        console.error('Error fetching matched events:', error);
      });
  }, [category, triggerRefresh]);

  const handleDelete = () => {
    if (selectedEvent.id) {
      // Make a DELETE request to your API endpoint to delete the selected event
      fetch(`/api/events/${selectedEvent.id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Event deleted successfully, update the events state to remove the deleted event
            setSelectedEvent(null);
            setTriggerRefresh(t => !t);
          } else {
            // Handle error if the event couldn't be deleted
            console.error('Error deleting event:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    }
  };

  const updateEvent = ({ id, title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur }) => {
    // Make a PUT request to update the event in the database
    fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur}),
    })
      .then((response) => response.json())
      .then((updatedEvent) => {
        // Handle the updated event data as needed
        console.log('Event updated successfully:', updatedEvent);
  
        // Find the index of the updated event in the state
        const updatedEventIndex = this.state.events.findIndex((event) => event.id === id);
  
        // Update the events state to reflect the changes
        if (updatedEventIndex !== -1) {
          this.setState((prevState) => {
            const updatedEvents = [...prevState.events];
            updatedEvents[updatedEventIndex] = updatedEvent;
            return {
              events: updatedEvents,
              isModalOpen: false,
              selectedEvent: null,
            };
          });
        }
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };

  return (
    <div className="search-results-container">
      <h1>Search Results for: <span>{category}</span></h1>

      {/* Display matched events as cards */}
      
      <div className="events-list">
        {matchedEvents.map(event => (
          <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
            <span>{event.title}</span>
            <span className="event-card-date">{event.start.toDateString()}</span>
          </div>
        ))}
      </div>

      <EventDetailModal
        isOpen={Boolean(selectedEvent)}
        closeModal={() => {
          setSelectedEvent(null)
          setTriggerRefresh(t => !t)
        }}
        event_id={selectedEvent?.id}
        onEdit={updateEvent}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Category;