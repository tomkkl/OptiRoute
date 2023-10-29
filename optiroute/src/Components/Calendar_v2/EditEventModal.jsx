import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import './EditEventModal.css'; // Import your CSS file for modal styling
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const EditEventModal = ({ isOpen, closeModal, event, onEdit }) => {
    console.log(event.id);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState(''); // State for recurrence field
  const [category, setCategory] = useState(''); // State for category field
  const [notification_time, setNotification_time] = useState('');
  const [startRecur, setStartRecur] = useState('');
  const [endRecur, setEndRecur] = useState('');


  useEffect(() => {
    // Set the initial values of the edit modal based on the selected event
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      setEnd(event.end);
      setLocation(event.extendedProps.location);
      setDescription(event.extendedProps.description);
      setRecurrence(event.extendedProps.recurrence);
      setCategory(event.extendedProps.category);
      setNotification_time(event.extendedProps.notification_time);
      setStartRecur(event.startRecur);
      setEndRecur(event.endRecur);
    }
  }, [event]);

  const handleEditEvent = () => {
    if (title && start && end && location && description && recurrence && category && notification_time && startRecur && endRecur) {
        console.log(event.id);
      // Construct the updated event data
      const updatedEvent = {
        id: event.id,
        title,
        start,
        end,
        location,
        description,
        recurrence,
        category,
        notification_time,
        startRecur, 
        endRecur
      };

      // Call the editEvent function to update the event
      onEdit(updatedEvent);
      // Close the modal
      closeModal();

    } else {
      alert('Please fill out all fields.');
    }
  };

  const recurrenceOptions = ['No recurrence', 'Daily', 'Weekly'];
  const categoryOptions = ['Personal', 'Work'];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Event"
      className="modal-add-event"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Edit Event</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Start Date and Time:</label>
        <Datetime
          value={start}
          onChange={(date) => setStart(date)}
          inputProps={{ placeholder: 'Select Start Date and Time' }}
        />
        <label>End Date and Time:</label>
        <Datetime
          value={end}
          onChange={(date) => setEnd(date)}
          inputProps={{ placeholder: 'Select End Date and Time' }}
        />
        <label>Notification Date and Time:</label>
        <Datetime
          value={notification_time}
          onChange={(date) => setNotification_time(date)}
          inputProps={{ placeholder: 'Select Notification Date and Time' }}
        />
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <div>
          <label>Recurrence:</label>
          <select className="select-field" value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
            <option value="">Select Recurrence</option>
            {recurrenceOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
            <label>Start Recurring Date:</label>
            <DatePicker
                selected={startRecur}
                onChange={(date) => setStartRecur(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Start Recurring Date"
            />
        </div>
        <div>
            <label>End Recurring Date:</label>
            <DatePicker
                selected={endRecur}
                onChange={(date) => setEndRecur(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select End Recurring Date"
            />
        </div>
        <div>
          <label>Category:</label>
          <select className="select-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleEditEvent}>Save Changes</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default EditEventModal;