import React, { useState } from 'react';
import Modal from 'react-modal';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import './AddEventModal.css'; // Import your CSS file for modal styling

Modal.setAppElement('#root');

const AddEventModal = ({ isOpen, closeModal, addEvent }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [recurrence, setRecurrence] = useState(''); // State for recurrence field
    const [category, setCategory] = useState(''); // State for category field

    const handleAddEvent = () => {
        if (title && start && end && location && description && recurrence && category) {
          addEvent({ title, start, end, location, description, recurrence, category });
          closeModal();
        } else {
          alert('Please fill out all fields.');
        }
    };

    const recurrenceOptions = ['Daily', 'Weekly'];
    const categoryOptions = ['Personal', 'Work'];

    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Add Event"
        className="modal"
        overlayClassName="overlay"
    >
        <div className="modal-content">
        <h2>Add Event</h2>
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
        <button onClick={handleAddEvent}>Add Event</button>
        <button onClick={closeModal}>Cancel</button>
        </div>
    </Modal>
    );
};

export default AddEventModal;
