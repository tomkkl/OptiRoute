import React from "react";
import Modal from "react-modal";

export default function EventDetailModal({ isOpen, onClose, event, onEdit, onDelete }) {  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {event && (
        <div>
          <h2>{event.title}</h2>
          <h2>Location:</h2> {event.location}
          <h2>Recurrence:</h2> {event.recurrence}
          <h2>Description:</h2> {event.description}
          <p><strong>Start Date:</strong> {event.start && event.start.toString()}</p>
          <p><strong>End Date:</strong> {event.end && event.end.toString()}</p>
          <button onClick={onClose}>Close</button>
          <button onClick={onEdit}>Edit Event</button>
          <button onClick={onDelete}>Delete Event</button>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </Modal>
  );
}
