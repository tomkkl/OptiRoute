import React, { Component } from 'react';
import Modal from 'react-modal';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

class EditEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start: '',
      end: '',
      location: '',
      description: '',
      recurrence: '',
      category: '',
      notification_time: '',
      startRecur: '',
      endRecur: ''
    };
  }

  componentDidMount() {
    const { event } = this.props;
    if (event) {
      this.setState({
        title: event.title,
        start: event.start,
        end: event.end,
        location: event.location,
        description: event.description,
        recurrence: event.recurrence,
        category: event.category,
        notification_time: event.notification_time,
        startRecur: event.startRecur,
        endRecur: event.endRecur
      });
    }
  }

  handleEditEvent = () => {
    const { title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur } = this.state;
    const { event, onEdit, closeModal } = this.props;

    if (title && start && end && location && description && recurrence && category && notification_time && startRecur && endRecur) {
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
      onEdit(updatedEvent);
      closeModal();
    } else {
      alert('Please fill out all fields.');
    }
  };

  render() {
    const { isOpen, closeModal } = this.props;
    const { title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur } = this.state;

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
        {/* <div className="modal-content">
          <h2>Edit Event</h2>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => this.setState({ title: e.target.value })} />

          <button onClick={this.handleEditEvent}>Save Changes</button>
          <button onClick={closeModal}>Cancel</button>
        </div> */}



        <div className="modal-content">
        <h2>Add Event</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => this.setState({ title: e.target.value })} />
        <label>Start Date and Time:</label>
        <Datetime
            value={start}
            onChange={(date) => this.setState(date)}
            inputProps={{ placeholder: 'Select Start Date and Time' }}
        />
        <label>End Date and Time:</label>
        <Datetime
            value={end}
            onChange={(date) => this.setState(date)}
            inputProps={{ placeholder: 'Select End Date and Time' }}
        />
        <label>Notification Date and Time:</label>
        <Datetime
            value={notification_time}
            onChange={(date) => this.setState(date)}
            inputProps={{ placeholder: 'Select Notification Date and Time' }}
        />
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => this.setState(e.target.value)} />
        <div>
        <label>Recurrence:</label>
          <select className="select-field" value={recurrence} onChange={(e) => this.setState(e.target.value)}>
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
                    {/* Disable the input field when "No recurrence" is selected */}
                    <Datetime
                        value={startRecur}
                        onChange={(date) => this.setStartRecur(date)}
                        inputProps={{ placeholder: 'Select Date', disabled: recurrence === 'No recurrence' }}
                    />
                </div>
                <div>
                    <label>End Recurring Date:</label>
                    {/* Disable the input field when "No recurrence" is selected */}
                    <Datetime
                        value={endRecur}
                        onChange={(date) => this.setState(date)}
                        inputProps={{ placeholder: 'Select Date', disabled: recurrence === 'No recurrence' }}
                    />
                </div>
        <div>
          <label>Category:</label>
          <select className="select-field" value={category} onChange={(e) => this.setState(e.target.value)}>
              <option value="">Select Category</option>
              {categoryOptions.map(option => (
                  <option key={option} value={option}>
                      {option}
                  </option>
              ))}
          </select>
        </div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => this.setState(e.target.value)} />
        <button onClick={this.handleEditEvent}>Save Changes</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    );
  }
}

export default EditEventModal;
