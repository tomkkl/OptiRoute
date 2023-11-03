import React, {useEffect } from 'react';
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventDetailsModal from './EventDetailsModal'; // Import the EventDetailsModal component
import AddEventModal from './AddEventModal';
import AddColorModal from './AddColorModal';
import { useNavigate } from 'react-router-dom';
import './CalendarMain.css';
import { Link } from 'react-router-dom';
import NotificationSettings from '../Notifications/NotificationSettings';

export var sendTitle;
export var sendStart;
export var sendEnd;
export var sendLocation;
export var sendDescription;
export var sendNotificationTime; 

Modal.setAppElement('#root');

function useNavigateWrapper() {
  const navigate = useNavigate();
  return navigate;
}

function CalendarMainWrapper() {
  const navigate = useNavigateWrapper();

  return <CalendarMain navigate={navigate} />;
}


export class CalendarMain extends React.Component {

  state = {
    weekendsVisible: true,
    events: [],
    isModalOpen: false,
    isAddEventModalOpen: false,
    isAddColorModalOpen: false,
    selectedEvent: null,
    searchTerm: "",
    categoryTerm: "",
  }

  componentDidMount() {
    // fetch events from the API endpoint
    fetch('/api/events') 
      .then((response) => response.json())
      .then((data) => {
        const transformedEvents = data.map((event) => {

          let eventColor = 'blue';
          //assign color on category 
          if (event.category === 'Work') {
            eventColor = 'red'; // Work events are red
          } else if (event.category === 'Personal') {
            eventColor = 'green'; // Personal events are green
          }
          // this.getColorCode(event.category);
          // let eventColor = this.state.eventColor;
          // console.log(eventColor)

          const start = new Date(event.start);
          const end = new Date(event.end);
          let daysOfWeek = null;
          let startTime = null;
          let endTime = null;
          let startRecur = null;
          let endRecur = null;


          if (event.endRecur) {
            endRecur = new Date(event.endRecur).toISOString();
          } 
          console.log(endRecur);



          if (event.recurrence !== "No recurrence") {
            if (event.recurrence === "Daily") {
              daysOfWeek = null;
            } else {
              const dayOfWeek = start.getDay() === 0 ? 7 : start.getDay(); // Adjusting Sunday to 7
              daysOfWeek = [dayOfWeek];
            }
            startTime = start.getHours() + ':' + (start.getMinutes() < 10 ? '0' : '') + start.getMinutes();
            endTime = end.getHours() + ':' + (end.getMinutes() < 10 ? '0' : '') + end.getMinutes();
            startRecur = new Date(event.startRecur).toISOString(); 
          } else {endRecur = null;}
        

          return {
            allDay: false,
            id: event._id,
            title: event.title,
            start: start,
            end: end,
            notification_time: new Date(event.notification_time),
            recurrence: event.recurrence,
            category: event.category,
            location: event.location,
            description: event.description,
            color: eventColor, // Set event color based on category
            daysOfWeek: daysOfWeek,//[1,3],
            startTime: startTime,
            endTime: endTime,
            startRecur: startRecur, 
            endRecur: endRecur,
          };
        });
        this.setState({ events: transformedEvents });
        console.log(transformedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }

  // Ben work
  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value});
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.props.navigate(`/search?query=${searchTerm}`);
    this.setState({ searchTerm: "" });
  };

  handleCategoryChange = (e) => {
    this.setState({ categoryTerm: e.target.value});
  };

  handleCategoryhSubmit = (e) => {
    e.preventDefault();
    const { categoryTerm } = this.state;
    this.props.navigate(`/category?category=${categoryTerm}`);
    this.setState({ categoryTerm: "" });
  };

  // css here 
  searchInputStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginRight: '10px',
    width: '200px'
  };
  
  searchButtonStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4C6EA5',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };
  //


  render() {
    return (
      <div>
        <button onClick={this.openAddEventModal}>Add Event</button>
        <button onClick={this.openAddColorModal}>Add Category</button>
    
        <div>
          <Link to="/notification-settings">
          <button>Notification Settings</button>
          </Link>
        </div>

        <div onClick={() => {useNavigateWrapper("/notification-settings")}}>NotificationSettings</div>


        <AddEventModal
          isOpen={this.state.isAddEventModalOpen}
          closeModal={this.closeAddEventModal}
          addEvent={this.addEvent}
        />
        <AddColorModal
          isOpen={this.state.isAddColorModalOpen}
          closeModal={this.closeAddColorModal}
          addColor={this.addColor}
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
            allDaySlot={false}
            stickyHeaderDates={true}
            height={'auto'}
            // options={{
            //   allDaySlot: false, // Set the allDaySlot option to false
            //   aspectRatio:  3, 
            //   height: "auto",
            //   stickyHeaderDates: true,
            // }}
 
          />
        </div>
        <EventDetailsModal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          event_id={this.state.selectedEvent}
          onEdit={this.updateEvent}
          onDelete={this.handleDelete}
        />
        <div className='flex-container-center'>
          <button onClick={() => this.props.navigate(`/recurring-events`)} className='common-dimensions'>Show Recurring Events</button>
        </div>
      
        <form onSubmit={this.handleSearchSubmit} style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <input // <form onSubmit... - START OF BEN WORK
          type="text" 
          placeholder="Search All Events"
          value={this.searchTerm}
          onChange={this.handleSearchChange}
          style={this.searchInputStyle}
          className="common-dimensions"
        />
      </form >

      <form onSubmit={this.handleCategoryhSubmit} style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <input // <form onSubmit... - START OF BEN WORK
          type="text" 
          placeholder="Search All Category"
          value={this.categoryTerm}
          onChange={this.handleCategoryChange}
          style={this.searchInputStyle}
          className="common-dimensions"
        />
      </form >


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
    console.log(clickInfo.event.title);
    console.log(clickInfo.event.id);
    this.setState({
      selectedEvent: clickInfo.event.id,
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

  openAddColorModal = () => {
    this.setState({
      isAddColorModalOpen: true,
    });
  };

  closeAddColorModal = () => {
    this.setState({
      isAddColorModalOpen: false,
    });
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  };

  addEvent = ({ title, start, end, location, category, description, recurrence, notification_time, startRecur, endRecur}) => {
    // Make a POST request to your API endpoint to save the event to MongoDB
  sendTitle = title;
  sendStart = start;
  sendEnd = end;
  sendLocation = location;
  sendDescription = category;
  sendNotificationTime = notification_time;
    // Start 
    
    // End
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end, location, category, description, recurrence, notification_time, startRecur, endRecur}),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
        console.log('Event added successfully:', data);

        //assign color on category 
        let eventColor = "blue"; // Default color
        if (data.category === 'Work') {
          eventColor = 'red'; // Work events are red
        } else if (data.category === 'Personal') {
          eventColor = 'green'; // Personal events are green
        }

        // this.getColorCode(data.category);
        // let eventColor = this.state.eventColor;
        // console.log(eventColor)



        const start = new Date(data.start);
        const end = new Date(data.end);
        let daysOfWeek = null;
        let startTime = null;
        let endTime = null;
        let startRecur = null;
        let endRecur = null;


        if (data.endRecur) {
          endRecur = new Date(data.endRecur).toISOString();
        } 
        console.log(endRecur);



        if (data.recurrence !== "No recurrence") {
          if (data.recurrence === "Daily") {
            daysOfWeek = null;
          } else {
            const dayOfWeek = start.getDay() === 0 ? 7 : start.getDay(); // Adjusting Sunday to 7
            daysOfWeek = [dayOfWeek];
          }
          startTime = start.getHours() + ':' + (start.getMinutes() < 10 ? '0' : '') + start.getMinutes();
          endTime = end.getHours() + ':' + (end.getMinutes() < 10 ? '0' : '') + end.getMinutes();
          startRecur = new Date(data.startRecur).toISOString(); 
        } else {endRecur = null;}
        
        // Update the events state to include the newly added event
        const newEvent = {
            allDay: false,
            id: data._id,
            title: data.title,
            start: start,
            end: end,
            notification_time: new Date(data.notification_time),
            recurrence: data.recurrence,
            category: data.category,
            location: data.location,
            description: data.description,
            color: eventColor, // Set event color based on category
            daysOfWeek: daysOfWeek,//[1,3],
            startTime: startTime,
            endTime: endTime,
            startRecur: startRecur, 
            endRecur: endRecur,
        };
        
        this.setState(prevState => ({
          events: [...prevState.events, newEvent]
        }));
      })
      .catch((error) => {
        console.error('Error adding event:', error);
      });
  };

  // getColorCode = async (categoryName) => {
  //   try {
  //     const response = await fetch('/api/colors');
  //     const data = await response.json();

  //     const colorObject = data.find((color) => color.colorName === categoryName);

  //     if (colorObject) {
  //       // If color object is found, update the eventColor state
  //       this.setState({ eventColor: colorObject.colorCode });
  //     } else {
  //       // If color object is not found, set a default color code
  //       this.setState({ eventColor: 'blue' }); // or any default color code you prefer
  //     }
  //   } catch (error) {
  //     console.error('Error fetching color code:', error);
  //     // Set a default color code in case of an error
  //     this.setState({ eventColor: 'blue' }); // or any default color code you prefer
  //   }
  // };
  

  addColor = ({ colorName, colorCode}) => {
    // Make a POST request to your API endpoint to save the event to MongoDB
    fetch('/api/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({colorName, colorCode}),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error adding event:', error);
      });
  };

  handleDelete = () => {
    const { selectedEvent } = this.state;
    if (selectedEvent) {
      // Make a DELETE request to your API endpoint to delete the selected event
      fetch(`/api/events/${selectedEvent}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Event deleted successfully, update the events state to remove the deleted event
            this.setState(prevState => ({
              events: prevState.events.filter(event => event.id !== selectedEvent),
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

updateEvent = ({ id, title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur }) => {
  // Make a PUT request to update the event in the database
  fetch(`/api/events/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, start, end, location, description, recurrence, category, notification_time, startRecur, endRecur}),
  })
    .then((response) => response.json())
    .then((data) => {
      // Find the index of the updated event in the state
      const updatedEventIndex = this.state.events.findIndex((event) => event.id === id);
      console.log(updatedEventIndex)

      // Update the events state to reflect the changes
      if (updatedEventIndex !== -1) {
        let eventColor = "blue"; // Default color
        if (data.category === 'Work') {
          eventColor = 'red'; // Work events are red
        } else if (data.category === 'Personal') {
          eventColor = 'green'; // Personal events are green
        }

        const start = new Date(data.start);
        const end = new Date(data.end);
        let daysOfWeek = null;
        let startTime = null;
        let endTime = null;
        let startRecur = null;
        let endRecur = null;


        if (data.endRecur) {
          endRecur = new Date(data.endRecur).toISOString();
        } 


        if (data.recurrence !== "No recurrence") {
          if (data.recurrence === "Daily") {
            daysOfWeek = null;
          } else {
            const dayOfWeek = start.getDay() === 0 ? 7 : start.getDay(); // Adjusting Sunday to 7
            daysOfWeek = [dayOfWeek];
          }
          startTime = start.getHours() + ':' + (start.getMinutes() < 10 ? '0' : '') + start.getMinutes();
          endTime = end.getHours() + ':' + (end.getMinutes() < 10 ? '0' : '') + end.getMinutes();
          startRecur = new Date(data.startRecur).toISOString(); 
        } else {endRecur = null;}
        
        // Update the events state to include the newly added event
        const newEvent = {
            allDay: false,
            id: data._id,
            title: data.title,
            start: start,
            end: end,
            notification_time: new Date(data.notification_time),
            recurrence: data.recurrence,
            category: data.category,
            location: data.location,
            description: data.description,
            color: eventColor, // Set event color based on category
            daysOfWeek: daysOfWeek,//[1,3],
            startTime: startTime,
            endTime: endTime,
            startRecur: startRecur, 
            endRecur: endRecur,
        };


        this.setState((prevState) => {
          const updatedEvents = [...prevState.events];
          updatedEvents[updatedEventIndex] = newEvent;
          return {
            events: updatedEvents,
            isModalOpen: false,
          };
        });
      }
    })
    .catch((error) => {
      console.error('Error updating event:', error);
    });
};



} export default CalendarMainWrapper;