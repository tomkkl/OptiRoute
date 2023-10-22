import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import { useNavigate } from "react-router-dom";


export default function EditEventModal({ isOpen, onClose, event, onEventUpdated }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [recurrence, setRecurrence] = useState("none");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("default");

  // Populate the state variables with the selected event details when the modal is opened
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      setEnd(event.end);
      setLocation(event.extendedProps.location);
      setAddress(event.extendedProps.address);
      setRecurrence(event.extendedProps.recurrence);
      setDescription(event.extendedProps.description);
      setCategory(event.extendedProps.category);
    }
  }, [event]);

  const onSubmit = (e) => {
    e.preventDefault();
  
    // Prepare the updated event data without circular references
    const updatedEventData = {
      id: event.id,
      title,
      start: start.toISOString(), // Convert Date objects to strings
      end: end.toISOString(),
      extendedProps: {
        location,
        address,
        recurrence,
        description,
        category,
      },
    };

    console.log('Updated Event Data:', updatedEventData);
    console.log('Event ID:', updatedEventData.id);
    console.log('Title:', updatedEventData.title);
    console.log('Start Date:', updatedEventData.start);
    console.log('End Date:', updatedEventData.end);
    console.log('Location:', updatedEventData.extendedProps.location);
    console.log('Address:', updatedEventData.extendedProps.address);
    console.log('Recurrence:', updatedEventData.extendedProps.recurrence);
    console.log('Description:', updatedEventData.extendedProps.description);
    console.log('Category:', updatedEventData.extendedProps.category);

  
    // Make a request to update the event data
    fetch(`/api/events/${event.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEventData),
    })
    .then(response => response.json())
    .then(updatedEventData => {
      // Call the onEventUpdated function with the updated event data
      onEventUpdated(updatedEventData);
      // Close the modal
      
    })
    .catch(error => {
      console.error('Error updating event:', error);
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="modal-container">
        <form onSubmit={onSubmit}>
        <div>
            <label className="label">Title</label>
            <input
              className="input-field"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Location</label>
            <input
              className="input-field"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Address</label>
            <input
              className="input-field"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Recurrence</label>
            <select
              className="select-field"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="label">Category</label>
            <select
              className="select-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default">Select Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              className="textarea-field"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Start Date</label>
            <Datetime value={start} onChange={(date) => setStart(date)} />
          </div>

          <div>
            <label className="label">End Date</label>
            <Datetime value={end} onChange={(date) => setEnd(date)} />
          </div>
          <button className="button">Save Event</button>
          <button type="button" className="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </Modal>
  );
}