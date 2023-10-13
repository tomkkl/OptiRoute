import React from "react";
import Modal from "react-modal";

export default function EventDetailModal({ isOpen, onClose, event, onEdit, onDelete }) {  
  if (event) {
    console.log("Event ID hfhhffh:", event); // Log the event ID when the modal is opened
    console.log("Event ID hfhhffh:", event.title); // Log the event ID when the modal is opened
    console.log("Event ID loc", event.extendedProps.location);
  }
  return (
 
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {event && (
        <div>
          <h3><strong>Title:</strong>{event.title}</h3>
          <p><strong>Location:</strong> {event.extendedProps.location} {/* Access location from extendedProps */}</p>
          <p><strong>Recurrence:</strong> {event.extendedProps.recurrence} {/* Access recurrence from extendedProps */}</p>
          <p><strong>Description:</strong> {event.extendedProps.description} {/* Access description from extendedProps */}</p>
          <p><strong>Start Date:</strong> {event.start && event.start.toString()}</p>
          <p><strong>End Date:</strong> {event.end && event.end.toString()}</p>
          <button onClick={onClose}>Close</button>
          <button onClick={onEdit}>Edit Event</button>
          <button onClick={() => onDelete(event.id)}>Delete Event</button>
          
        </div>
      )}
    </Modal>
  );
}
