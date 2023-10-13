import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "./EventModal.css"; // Import the CSS file for styles

export default function ({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [location, setLocation] = useState("");
  const [recurrence, setRecurrence] = useState("none");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("default"); // New state variable for category

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title,
      start,
      end,
      location,
      recurrence,
      description,
      category
    });

    onClose();
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
          <button className="button">Add Event</button>
        </form>
      </div>
    </Modal>
  );
}
