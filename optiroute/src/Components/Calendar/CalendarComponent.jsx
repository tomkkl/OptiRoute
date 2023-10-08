import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { nanoid } from "nanoid";
import CustomModal from "./CustomModal";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);
  const [eventDetails, setEventDetails] = useState({
    id: "",
    title: "",
    start: null,
    end: null,
  });

  const handleDateSelect = (selectInfo) => {
    const { start, end } = selectInfo;
    setEventDetails({
      id: nanoid(),
      title: "",
      start,
      end,
    });
    setModalOpen(true);
  };

  const handleEventClick = (eventClickInfo) => {
    const { id, title, start, end } = eventClickInfo.event;
    setEventDetails({ id, title, start, end });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEventSave = (newEventDetails) => {
    const updatedEvents = events.map((event) =>
      event.id === newEventDetails.id ? newEventDetails : event
    );
    setEvents(updatedEvents);
    setModalOpen(false);
  };

  const handleEventDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    setModalOpen(false);
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
      <CustomModal
        isOpen={modalOpen}
        eventDetails={eventDetails}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default CalendarComponent;
