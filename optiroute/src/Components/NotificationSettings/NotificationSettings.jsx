import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationSettings = () => {
    // Check if the browser supports the Notification API
if ('Notification' in window) {
    // Request permission to show notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // Create a new notification
        const notification = new Notification('Hello!', {
          body: 'This is a notification.',
          icon: 'https://example.com/icon.png', // URL to the notification icon
        });
  
        // Optional: Handle click on the notification
        notification.onclick = () => {
          console.log('Notification clicked.');
          // Perform an action when the notification is clicked
        };
      } else {
        console.log('Notification permission denied.');
      }
    });
  } else {
    console.log('Browser does not support notifications.');
  }
    // const notify = () => toast("Wow so easy!");
    // useEffect(() => {
    //     const notificationTime = new Date('2023-12-01T09:52:00.000+00:00');
    //     const currentDate = new Date();
    
    //     const timeDifference = notificationTime.getTime() - currentDate.getTime();
    
    //     if (timeDifference > 0) {
    //         setTimeout(() => {
    //             toast.info('This is your scheduled notification!', {
    //                 position: toast.POSITION.TOP_RIGHT,
    //                 // Other options (autoClose, draggable, etc.)
    //             });
    //         }, timeDifference);
    //     }
    // }, []);

    return (
        <div>
            <h1>Hello</h1>
          {/* <button onClick={notify}>Notify!</button> */}
          {/* <ToastContainer /> */}
        </div>
      );
};

export default NotificationSettings;
