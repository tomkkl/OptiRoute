import React from "react";
import Modal from "react-modal";
import "./EventDetail.css"; // Import the CSS file for styles
import EditEventModal from './EditEventModal'; // Make sure the path is correct
import { useState } from "react";

export default function EventDetailModal({ isOpen, onClose, event, onEdit, onDelete }) {
  const [editModalOpen, setEditModalOpen] = useState(false); // Define the state variable here
    if (event) {
    console.log("Event ID hfhhffh:", event); // Log the event ID when the modal is opened
    console.log("Event ID hfhhffh:", event.range); // Log the event ID when the modal is opened
    console.log("Event ID loc", event.extendedProps.location);
  }
  return (
 
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {event && (
        <div className="modal-container">
          <h3><strong>Title:</strong>{event.title}</h3>
          <p><strong>Location:</strong> {event.extendedProps.location} {/* Access location from extendedProps */}</p>
          <p><strong>Category:</strong> {event.extendedProps.category} {/* Access Category from extendedProps */}</p>
          <p><strong>Recurrence:</strong> {event.extendedProps.recurrence} {/* Access recurrence from extendedProps */}</p>
          <p><strong>Description:</strong> {event.extendedProps.description} {/* Access description from extendedProps */}</p>
          <p><strong>Start Date:</strong> {event.start && event.start.toString()}</p>
          <p><strong>End Date:</strong> {event.end && event.end.toString()}</p>
          <button onClick={onClose}>Close</button>
          <button onClick={() => { onEdit(); setEditModalOpen(true); }}>Edit Event</button>
          <button onClick={() => onDelete(event.id)}>Delete Event</button>
          <EditEventModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            event={event}
            onEventUpdated={(updatedEvent) => {
              // Call the onEdit function with the updated event data
              onEdit(updatedEvent);
              // Close the edit modal
              setEditModalOpen(false);
            }}
          />
        </div>
      )}
    </Modal>
  );
}
