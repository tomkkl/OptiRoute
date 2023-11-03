// NotificationApp.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationHistory from './NotificationHistory';
import NotificationSettings from './NotificationSettings';

function Notifications() {
  const [notificationHistory, setNotificationHistory] = useState([]);

  const addNotificationToHistory = (message) => {
    setNotificationHistory([...notificationHistory, message]);
  };

  return (
    <div>
    <NotificationSettings onNotificationHistoryAdd={addNotificationToHistory} />
    <NotificationHistory history={notificationHistory} />
    </div>
  );

}

// function Notifications() {
//   const showSuccessNotification = () => {
//     toast.success('Success notification');
//   };

//   const showErrorNotification = () => {
//     toast.error('Error notification');
//   };

//   const showWarningNotification = () => {
//     toast.warning('Warning notification');
//   };
//   const customNotification = () => { // custom settings like dark theme 
//     toast.info('Customized Notification!', {
//       position: "top-left",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//       });

//   }

//   return (
//     <div className="notification app">
//       <h1>Notifications</h1>
//       <button onClick={showSuccessNotification}>Show Success Notification</button>
//       <button onClick={showErrorNotification}>Show Error Notification</button>
//       <button onClick={showWarningNotification}>Show Warning Notification</button>
//       <button onClick={customNotification}>Custom Notification</button>
//       <ToastContainer />
//     </div>
//   );
// }

export default Notifications;
