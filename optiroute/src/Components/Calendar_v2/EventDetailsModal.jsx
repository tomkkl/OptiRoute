import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import { formatDate } from '@fullcalendar/core';
import './EventDetailsModal.css'; // Import the CSS file for modal styling
import EditEventModal from './EditEventModal'; // Import the EditEventModal component

Modal.setAppElement('#root');

const EventDetailsModal = ({ isOpen, closeModal, event_id, onEdit, onDelete }) => {
  
  console.log("EventDetailsModal id: " + event_id)
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const componentDidMount = () => {
    const { event } = this.props;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = this.initAutocomplete;
    document.head.appendChild(script);

  }

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
  }, [isOpen, event_id, triggerRefresh]); // added triggerRefresh here


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
            <strong>Address:   </strong> {event.address}
          </p>
          <p>
            <strong>Longitude:   </strong> {event.longitude}
          </p>

          <p>
            <strong>Latitude:   </strong> {event.latitude}
          </p>
          <p>
            <strong>Recurrence:   </strong> {event.recurrence}
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
              closeModal={() => {
                setEditModalOpen(false)
                // ben fix for not auto-update popup
                setTriggerRefresh(t => !t);
              }}
              event={event}
              onEdit={onEdit}
              event_id={event_id}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default EventDetailsModal;
