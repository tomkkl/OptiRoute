import React, { useState } from "react";
import Modal from "react-modal";

export default function EditEventModal({ isOpen, onClose, event, onSave }) {
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleSave = () => {
    onSave(editedEvent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Edit Event</h2>
      <form>
        {/* Render form inputs for editing event details */}
        <input
          type="text"
          value={editedEvent.title}
          onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
        />
        {/* Add other input fields for start, end, location, recurrence, description */}
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
}
