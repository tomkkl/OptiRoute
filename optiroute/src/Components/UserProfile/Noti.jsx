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
    
  );
}

export default Noti;
