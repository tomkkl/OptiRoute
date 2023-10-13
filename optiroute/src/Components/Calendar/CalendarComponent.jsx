import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import Modal from "react-modal";
import EventDetailModal from "./EventDetailModal";

Modal.setAppElement('#root');

function CalendarComponent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]); // State to store events from the database
  const calendarRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false); // State for event detail modal


   // Fetch events from the backend when the component mounts
   useEffect(() => {
    fetch('/api/events') // Assuming this endpoint returns the list of events
      .then(response => response.json())
      .then(data => {
        setEvents(data); // Set the events in the state
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const onDeleteEvent = () => {
    if (selectedEvent) {
      const eventId = selectedEvent.id; // Assuming your event object has an 'id' property
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
    }
  };
  
  const onEventAdded = (event) => {
    const eventData = {
        title: event.title,
        start: event.start,
        end: event.end,
        location: event.location,
        recurrence: event.recurrence,
        description: event.description,
    };
    const handleEventClick = (info) => {
      // info.event holds the clicked event data
      setSelectedEvent(info.event);
      setDetailModalOpen(true);
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
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        eventClick={(info) => {
          // `info.event` contains the event object. You can extract the necessary details from it.
          setSelectedEvent(info.event);
          setDetailModalOpen(true); // Open the EventModal when an event is clicked
        }}
      />
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      <EventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}></EventModal>
      <EventDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        event={selectedEvent}
        onDelete={onDeleteEvent} // Pass the onDeleteEvent handler to the EventDetailModal
        onEdit={() => {
          // Logic to open the edit event modal, if you have one
        }}
      />
    </div>
  );
}

export default CalendarComponent;

//7:56

