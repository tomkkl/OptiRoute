import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import Modal from "react-modal";
import EventDetailModal from "./EventDetailModal";
import DeleteEventModal from "./DeleteEventModal";
import EditEventModal from './EditEventModal'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function CalendarComponent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]); // State to store events from the database
  const calendarRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false); // State for event detail modal
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit event modal
  const [deleteEventModalOpen, setDeleteEventModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        // Map MongoDB _id to FullCalendar id property
        const eventsWithId = data.map(event => ({
          ...event,
          id: event._id, // Map MongoDB _id to FullCalendar id property
          start: new Date(event.start), // Convert start and end to Date objects if they are in string format
          end: new Date(event.end),
        }));
        console.log('Fetched events with IDs:', eventsWithId);
        setEvents(eventsWithId);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const openDeleteEventModal = (eventId) => {
    setEventToDelete(eventId);
    setDeleteEventModalOpen(true);
  };
  
  const closeDeleteEventModal = () => {
    setEventToDelete(null);
    setDeleteEventModalOpen(false);
  };

  const onDeleteEvent = (eventId) => {
    console.log('Deleting event with ID:', eventId); // Print out the eventId
    fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Event deleted successfully, update the events state to remove the deleted event
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            setDetailModalOpen(false); // Close the detail modal after deletion
        } else {
            console.error('Error deleting event:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting event:', error);
    });
};

const onEditEvent = (updatedEvent) => {
  console.log('Editing event with ID:', updatedEvent.id); // Print out the eventId
  fetch(`/api/events/${updatedEvent.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
  })
  .then(response => {
      if (response.ok) {
          // Event updated successfully, update the events state with the updated event
          setEvents(prevEvents => prevEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
          setEditModalOpen(false); // Close the edit modal after updating the event
      } else {
          console.error('Error updating event:', response.statusText);
      }
  })
  .catch(error => {
      console.error('Error updating event:', error);
  });
};

const onEventUpdated = (updatedEvent) => {
  fetch(`/api/events/${updatedEvent.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEvent),
  })
    .then((response) => {
      if (response.ok) {
        // Event updated successfully
        console.log('Event updated successfully:', updatedEvent);
        // Call the callback function provided via props (e.g., onEventUpdated)
        onEventUpdated(updatedEvent);
      } else {
        console.error('Error updating event:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error updating event:', error);
    });
};

  const onEventAdded = (event) => {
    const eventData = {
        title: event.title,
        start: event.start,
        end: event.end,
        address: event.address,
        location: event.location,
        recurrence: event.recurrence,
        description: event.description,
        category: event.category
    };

    fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Event created successfully:', data);
    })
    .catch((error) => {
        console.error('Error creating event:', error);
    });
    

    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
};

  return (
    <div style={{position: "relative", zIndex: 0}}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        editable={true}
        selectable={true}
        events={events} // Pass the events to FullCalendar for rendering
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "timeGridDay,timeGridWeek,dayGridMonth", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        eventClick={(info) => {
          const clickedEventId = info.event.id;
          console.log('Clicked event ID:', clickedEventId);
          
          setSelectedEvent(info.event);
          setDetailModalOpen(true);

        }}
      />
       <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button onClick={() => setModalOpen(true)}>Add Event</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button onClick={() => {navigate("/map")}}>Create Map</button>
      </div>
      <EventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}></EventModal>
      <EventDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        event={selectedEvent}
        onEdit={() => setEditModalOpen(true)}
        onDelete={() => openDeleteEventModal(selectedEvent.id)}
      />

      <DeleteEventModal
        isOpen={deleteEventModalOpen}
        onClose={closeDeleteEventModal}
        onConfirm={() => onDeleteEvent(eventToDelete)}
      />

      <EditEventModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        event={editedEvent}
        onEventUpdated={(updatedEvent) => {
          // Update the event in the events state array
          const updatedEvents = events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          );
          setEvents(updatedEvents);
          setEditModalOpen(false);
        }}
      />
    </div>
  );
}

export default CalendarComponent;

//7:56
