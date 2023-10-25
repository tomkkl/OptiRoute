import React from 'react';
import Modal from 'react-modal';
import { formatDate } from '@fullcalendar/core';
import './EventDetailsModal.css'; // Import the CSS file for modal styling

Modal.setAppElement('#root');

const EventDetailsModal = ({ isOpen, closeModal, event }) => {
    console.log(event)
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Details"
      className="modal"
      overlayClassName="overlay"
    >
      {event && (
        <div className="modal-content">
          <h2>{event.title}</h2>
          <p>
            <strong>Start:      </strong> {formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
          </p>
          <p>
            <strong>End:        </strong> {formatDate(event.end, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
          </p>
          <p>
            <strong>Location:   </strong> {event.extendedProps.location}
          </p>
          <p>
            <strong>Category:   </strong> {event.extendedProps.category}
          </p>
          <p>
            <strong>Description:</strong> {event.extendedProps.description}
          </p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default EventDetailsModal;
