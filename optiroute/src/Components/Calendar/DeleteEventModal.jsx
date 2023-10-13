// DeleteEventModal.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const DeleteEventModal = ({ isOpen, onClose, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    onClose();
    navigate("/calendar"); // Navigate back to the calendar page
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this event?</p>
        <button onClick={handleConfirm}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DeleteEventModal;
