// NotificationSettings.jsx
// Gives the user the ability to edit notification settings
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NotificationSettings.css'

const NotificationSettings = () => {
    /* Toggle Notifications On/Off start */
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        /* off = true, on = false */
        const notificationMessage = notificationsEnabled
          ? 'Notifications are now OFF'
          : 'Notifications are now ON';
    
        toast.info(notificationMessage, {
          position: 'top-right',
        });
      };

    /* Toggle Notifications On/Off end*/


    /* Toggle Dark Mode On/Off Start */
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const toggleDarkMode = () => {
        setDarkModeEnabled(!darkModeEnabled);
        // off = true, on = false
        const darkModeMessage = darkModeEnabled
          ? 'Dark Mode is now OFF'
          : 'Dark Mode is now ON';
          
          var mode = ''
          if (!darkModeEnabled) {
              mode = 'dark'
          } else {
              mode = 'light'
          } 
          
        toast.info(darkModeMessage, {
          
          position: 'top-right',
          theme: mode,
        });
      };
    /* Toggle Dark Mode On/Off End */ 


    /* Toggle Start Date/Time Start*/
    const [startDateTimeEnabled, setStartDateTimeEnabled] = useState(false);

    const toggleStartDateTime = () => {
        setStartDateTimeEnabled(!startDateTimeEnabled);
        const startDateTimeMessage = startDateTimeEnabled
          ? 'Start date/time will no longer be displayed'
          : 'Start date/time will now be displayed';

        toast.info(startDateTimeMessage, {
            position: 'top-right',
        });
        

    };
    /* Toggle Start Date/Time End */


    /* Toggle End Date/Time Start */
    const [endDateTimeEnabled, setEndDateTimeEnabled] = useState(false);

    const toggleEndDateTime = () => {
        setEndDateTimeEnabled(!endDateTimeEnabled);
        const endDateTimeMessage = endDateTimeEnabled
          ? 'End date/time will no longer be displayed'
          : 'End date/time will now be displayed';

        toast.info(endDateTimeMessage, {
            position: 'top-right',
        });
        
    };
    /* Toggle End Date/Time End */


    /* Toggle Location Start */
    const [locationEnabled, setLocationEnabled] = useState(false);

    const toggleLocation = () => {
        setLocationEnabled(!locationEnabled);
        const locationMessage = locationEnabled
          ? 'Location will no longer be displayed'
          : 'Location will now be displayed';

        toast.info(locationMessage, {
            position: 'top-right',
        });
        
    };
    /* Toggle Location End */

    /* Toggle Description Start */
    const [descriptionEnabled, setDescriptionEnabled] = useState(false);

    const toggleDescription = () => {
        setDescriptionEnabled(!descriptionEnabled);
        const descriptionMessage = descriptionEnabled
          ? 'Description will no longer be displayed'
          : 'Description will now be displayed';

        toast.info(descriptionMessage, {
            position: 'top-right',
        });
        
    };
    /* Toggle Description End */

    return(
        <div className='two-labels-container'>
            <div>
                <label>Toggle Notifications: </label>
                <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} />
            </div>

            <div>
                <label>Toggle Dark Mode: </label>
                <input type="checkbox" checked={darkModeEnabled} onChange={toggleDarkMode} />   
            </div>

            <div>
                <label>Show Start Date and Time: </label>
                <input type="checkbox" checked={startDateTimeEnabled} onChange={toggleStartDateTime} /> 
            </div>

            <div>
            <label>Show End Date and Time: </label>
            <input type="checkbox" checked={endDateTimeEnabled} onChange={toggleEndDateTime} /> 
            </div>

            <div>
            <label>Show Location: </label>
            <input type="checkbox" checked={locationEnabled} onChange={toggleLocation} /> 
            </div>            

            <div>
            <label>Show Description: </label>
            <input type="checkbox" checked={descriptionEnabled} onChange={toggleDescription} /> 
            </div>

            <ToastContainer
                position="top-left"
                autoClose = {5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick = {true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
  
    );
}

export default NotificationSettings;