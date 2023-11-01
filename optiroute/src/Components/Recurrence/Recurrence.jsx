import React, { useState, useEffect } from 'react';
import EventDetailModal from "../Calendar_v2/EventDetailsModal";

import './Recurrence.css'; // Assuming we can use the same styles from Search.jsx

/*

  TODO: REDO EventDetailModal, EDITING AND DELETING AFTER JOHN IS DONE WITH CALENDARV2
  Broken: Edit event only edits the title, nothing else, hopefully fixed with CalendarV2 implementation
  Broken: Delete event currently routes to /calendar and I have to manually route to /recurring-events, fix this
*/

function Recurrence() {
  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

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

  useEffect(() => {
    fetch(`/api/events?recurrence=Weekly,Daily`)
      .then(response => response.json())
      .then(data => {
        // Filter out any events that have a recurrence value of "No recurrence"
        const filteredEvents = data.filter(event => event.recurrence !== "No recurrence").map(event => ({
          ...event,
          id: event._id,
          title: event.title,
          recurrence: event.recurrence
        }));
        console.log('Events with recurrence:', filteredEvents);
        setMatchedEvents(filteredEvents);
      })
      .catch(error => {
        console.error('Error fetching events with recurrence:', error);
      });
  }, [triggerRefresh]);

  return (
    <div className="search-results-container">
      <h1>All Recurring Events</h1>

      {/* Display matched events as cards */}

      <div className="events-list">
        {matchedEvents.map(event => (
          <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
            <span>{event.title}</span>
            <span className="event-recurrence">{event.recurrence}</span>
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

export default Recurrence;