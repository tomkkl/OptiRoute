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
          if (event.category === 'Work') {
            eventColor = 'red'; // Work events are red
          } else if (event.category === 'Personal') {
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
        <EventDetailsModal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          event={this.state.selectedEvent}
          onEdit={this.updateEvent}
          onDelete={this.handleDelete}
        />
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleEventClick = (clickInfo) => {
    console.log(clickInfo);
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

  addEvent = ({ title, start, end, location, category, description, recurrence }) => {
    // Make a POST request to your API endpoint to save the event to MongoDB
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end, location, category, description, recurrence }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
        console.log('Event added successfully:', data);
        
        // Update the events state to include the newly added event
        const newEvent = {
          id: data._id,
          title: data.title,
          start: new Date(data.start),
          end: new Date(data.end),
          recurrence: data.recurrence,
          category: data.category,
          location: data.location,
          description: data.description,
        };
        
        this.setState(prevState => ({
          events: [...prevState.events, newEvent]
        }));
      })
      .catch((error) => {
        console.error('Error adding event:', error);
      });
  };


  handleDelete = () => {
    const { selectedEvent } = this.state;
    if (selectedEvent) {
      // Make a DELETE request to your API endpoint to delete the selected event
      fetch(`/api/events/${selectedEvent.id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Event deleted successfully, update the events state to remove the deleted event
            this.setState(prevState => ({
              events: prevState.events.filter(event => event.id !== selectedEvent.id),
              selectedEvent: null,
              isModalOpen: false,
            }));
          } else {
            // Handle error if the event couldn't be deleted
            console.error('Error deleting event:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    }
  };


//   updateEvent = ({ id, title, start, end, location, description, recurrence, category }) => {
//   // Make a PUT request to update the event in the database
//   fetch(`/api/events/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ title, start, end, location, description, recurrence, category }),
//   })
//     .then((response) => response.json())
//     .then((updatedEvent) => {
//       // Handle the updated event data as needed
//       console.log('Event updated successfully:', updatedEvent);

//       // Find the index of the updated event in the state
//       const updatedEventIndex = this.state.events.findIndex((event) => event.id === id);

//       // Update the events state to reflect the changes
//       if (updatedEventIndex !== -1) {
//         this.setState((prevState) => {
//           const updatedEvents = [...prevState.events];
//           updatedEvents[updatedEventIndex] = updatedEvent;
//           return {
//             events: updatedEvents,
//             isModalOpen: false,
//             selectedEvent: null,
//           };
//         });
//       }
//     })
//     .catch((error) => {
//       console.error('Error updating event:', error);
//     });
// };

updateEvent = ({ id, title, start, end, location, description, recurrence, category }) => {
  // Make a PUT request to update the event in the database
  fetch(`/api/events/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, start, end, location, description, recurrence, category }),
  })
    .then((response) => response.json())
    .then((updatedEvent) => {
      // Handle the updated event data as needed
      console.log('Event updated successfully:', updatedEvent);

      // Find the index of the updated event in the state
      const updatedEventIndex = this.state.events.findIndex((event) => event.id === id);

      // Update the events state to reflect the changes
      if (updatedEventIndex !== -1) {
        this.setState((prevState) => {
          const updatedEvents = [...prevState.events];
          updatedEvents[updatedEventIndex] = updatedEvent;
          return {
            events: updatedEvents,
            isModalOpen: false,
            selectedEvent: null,
          };
        });
      }
    })
    .catch((error) => {
      console.error('Error updating event:', error);
    });
};



}