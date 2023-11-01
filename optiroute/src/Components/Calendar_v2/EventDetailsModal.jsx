import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import { formatDate } from '@fullcalendar/core';
import './EventDetailsModal.css'; // Import the CSS file for modal styling
import EditEventModal from './EditEventModal'; // Import the EditEventModal component

Modal.setAppElement('#root');

const EventDetailsModal = ({ isOpen, closeModal, event_id, onEdit, onDelete }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [event, setEvent] = useState(null);

  const handleEdit = () => {
    setEditModalOpen(true);
  };
  console.log(event_id);

  useEffect(() => {
    // Fetch event details based on event_id from your API
    const fetchEventDetails = async () => {
      try {
        // Perform API call to fetch event details using event_id
        const response = await fetch(`/api/events/${event_id}`); // Replace this with your actual API endpoint
        const event  = await response.json();
        console.log(event)
        setEvent(event); // Update the event state with fetched data
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    // Call the fetchEventDetails function when the component mounts
    if (isOpen && event_id) {
      fetchEventDetails();
    }
  }, [isOpen, event_id]);


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
            <strong>Location:   </strong> {event.location}
          </p>
          <p>
            <strong>Category:   </strong> {event.category}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
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
