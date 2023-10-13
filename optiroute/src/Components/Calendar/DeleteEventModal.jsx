import React from "react";
import Modal from "react-modal";

export default function DeleteEventModal({ isOpen, onClose, onDelete, event }) {
  const handleDelete = () => {
    onDelete(event.id); // Implement the logic to delete the event
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Delete Event</h2>
      <p>Are you sure you want to delete this event?</p>
      <button onClick={handleDelete}>Delete Event</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
}
