import React, { useState } from 'react';
import Modal from 'react-modal';
import { formatDate } from '@fullcalendar/core';
import './EventDetailsModal.css'; // Import the CSS file for modal styling
import EditEventModal from './EditEventModal'; // Import the EditEventModal component

Modal.setAppElement('#root');

const EventDetailsModal = ({ isOpen, closeModal, event, onEdit, onDelete }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  console.log(event)

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Details"
      className="modal-detail"
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
          <button onClick={handleEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
          <button onClick={closeModal}>Close</button>

          {/* Render EditEventModal when isEditModalOpen is true */}
          {isEditModalOpen && (
            <EditEventModal
              isOpen={isEditModalOpen}
              closeModal={() => setEditModalOpen(false)}
              event={event}
              onEdit={onEdit}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default EventDetailsModal;
