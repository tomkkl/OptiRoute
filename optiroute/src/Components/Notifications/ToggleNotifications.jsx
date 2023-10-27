// src/NotificationToggle.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationToggle = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    const notificationMessage = notificationsEnabled
      ? 'Notifications are now ON'
      : 'Notifications are now OFF';

    toast.info(notificationMessage, {
      position: 'top-right',
    });
  };

  return (
    <div>
      <label>Toggle Notifications:</label>
      <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} />
    </div>
  );
};

export default NotificationToggle;