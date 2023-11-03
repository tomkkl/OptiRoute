// NotificationSettings.jsx
// Gives the user the ability to edit notification settings
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NotificationSettings.css'



function NotificationHistory({ history }) {
    return (
      <div>
        <h1>Notification History</h1>
        <ul>
          {history.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default NotificationHistory;