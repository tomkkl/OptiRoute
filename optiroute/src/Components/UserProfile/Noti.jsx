import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Noti() {
  const showNotification = () => {
    toast.info('Your event is starting now!', {
      position: 'top-right',
    });
  };

  return (
    <div className="Noti">
      <h1>Event Reminder App</h1>
      <button onClick={showNotification}>Show Event Reminder</button>
      <ToastContainer />
    </div>
  );
}

export default Noti;
