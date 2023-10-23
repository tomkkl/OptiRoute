import React, { useState } from 'react';
import Modal from 'react-modal';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventDetailsModal from './EventDetailsModal'; // Import the EventDetailsModal component
import AddEventModal from './AddEventModal';

Modal.setAppElement('#root');

export default class CalendarMain extends React.Component {

  state = {
    weekendsVisible: true,
    events: [],
    isModalOpen: false,
    isAddEventModalOpen: false,
    selectedEvent: null,
  }

  componentDidMount() {
    // fetch events from the API endpoint
    fetch('/api/events') 
      .then((response) => response.json())
      .then((data) => {
        const transformedEvents = data.map((event) => {

          //assign color on category 
          let eventColor = "blue"; // Default color
          if (event.category === 'work') {
            eventColor = 'red'; // Work events are red
          } else if (event.category === 'personal') {
            eventColor = 'green'; // Personal events are green
          }

          return {
            id: event._id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            recurrence: event.recurrence,
            category: event.category,
            location: event.location,
            description: event.description,
            color: eventColor, // Set event color based on category
          };
        });
        this.setState({ events: transformedEvents });
        console.log(transformedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.openAddEventModal}>Add Event</button>
        <AddEventModal
          isOpen={this.state.isAddEventModalOpen}
          closeModal={this.closeAddEventModal}
          addEvent={this.addEvent}
        />
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              start: "today prev,next", 
              center: "title",
              end: "timeGridDay,timeGridWeek,dayGridMonth", 
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            firstDay={1}
            events={this.state.events} // Use events prop instead of initialEvents
            select={this.handleDateSelect}
            //eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
        <EventDetailsModal isOpen={this.state.isModalOpen} closeModal={this.closeModal} event={this.state.selectedEvent} />
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        //id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    this.setState({
      selectedEvent: clickInfo.event,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      selectedEvent: null,
      isModalOpen: false,
    });
  };

  openAddEventModal = () => {
    this.setState({
      isAddEventModalOpen: true,
    });
  };

  closeAddEventModal = () => {
    this.setState({
      isAddEventModalOpen: false,
    });
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  };

  addEvent = ({ title, start, end, location, category, description }) => {
    // Make a POST request to your API endpoint to save the event to MongoDB
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end, location, category, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
        console.log('Event added successfully:', data);
      })
      .catch((error) => {
        console.error('Error adding event:', error);
      });
  };



}