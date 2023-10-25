// DeleteEventModal.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./DeleteEventModal.css"; // Import the CSS file for styles

const DeleteEventModal = ({ isOpen, onClose, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    onClose();
    navigate("/calendar"); // Navigate back to the calendar page
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="centered-modal">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this event?</p>
        <button onClick={handleConfirm}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DeleteEventModal;
