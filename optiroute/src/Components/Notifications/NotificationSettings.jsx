// NotificationSettings.jsx
// Gives the user the ability to edit notification settings
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NotificationSettings.css'

var message = 'Dinner with Tom';
var onOff = true; // controls whether notification is on or off
var darkMode = ''; // controls whether it is light or dark mode
var start = true; // controls whether start message should be included in notification
var end = true; // controls whether end message should be included in notification
var location = true; // controls whether location should be included in notification
var description = true; // controls whether description should be included in notification



// Figure out fetch and all that stuff
// Figure out how to get data from John
// Figure out how to send real time notis
const NotificationSettings = () => {
    /* Toggle Notifications On/Off start */
    

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        /* off = true, on = false */
        const notificationMessage = notificationsEnabled
          ? 'Notifications are now OFF'
          : 'Notifications are now ON';

        
        onOff = notificationsEnabled;
    
        toast.info(notificationMessage);
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
          
          if (!darkModeEnabled) {
              darkMode = 'dark'
          } else {
              darkMode = 'light'
          } 
        
        toast.info(darkModeMessage)        
        
      };
    /* Toggle Dark Mode On/Off End */ 


    /* Toggle Start Date/Time Start*/
    const [startDateTimeEnabled, setStartDateTimeEnabled] = useState(false);

    const toggleStartDateTime = () => {
        setStartDateTimeEnabled(!startDateTimeEnabled);
        const startDateTimeMessage = startDateTimeEnabled
          ? 'Start date/time will no longer be displayed'
          : 'Start date/time will now be displayed';

        start = startDateTimeEnabled;

        toast.info(startDateTimeMessage)

        const toAdd = ", Start Date/Time: 16:00"; // String that we will be appending
        if(!start) { // include start message only if start is false
            message = message + toAdd
        } else { // remove start message
            const newString = message.replace(toAdd, "");
            message = newString;
        }
        
    };
    /* Toggle Start Date/Time End */


    /* Toggle End Date/Time Start */
    const [endDateTimeEnabled, setEndDateTimeEnabled] = useState(false);

    const toggleEndDateTime = () => {
        setEndDateTimeEnabled(!endDateTimeEnabled);
        const endDateTimeMessage = endDateTimeEnabled
          ? 'End date/time will no longer be displayed'
          : 'End date/time will now be displayed';

        end = endDateTimeEnabled

        toast.info(endDateTimeMessage);
        const toAdd = ", End Date/Time: 17:00\n";
        if (!end) { // include end message only if end is false
            message = message + toAdd
        } else { // remove end message
            const newString = message.replace(toAdd, '');
            message = newString;
        }
        
    };
    /* Toggle End Date/Time End */


    /* Toggle Location Start */
    const [locationEnabled, setLocationEnabled] = useState(false);

    const toggleLocation = () => {
        setLocationEnabled(!locationEnabled);
        const locationMessage = locationEnabled
          ? 'Location will no longer be displayed'
          : 'Location will now be displayed';

        location = locationEnabled

        toast.info(locationMessage);
        const toAdd = ", Location: West Lafayette \n";
        if(!location) { // include location only if location variable is false
            message = message + toAdd;
        } else { // remove location message
            const newString = message.replace(toAdd, "");
            message = newString;
        }

    };
    /* Toggle Location End */

    /* Toggle Description Start */
    const [descriptionEnabled, setDescriptionEnabled] = useState(false);

    const toggleDescription = () => {
        setDescriptionEnabled(!descriptionEnabled);
        const descriptionMessage = descriptionEnabled
          ? 'Description will no longer be displayed'
          : 'Description will now be displayed';
        
        description = descriptionEnabled
        toast.info(descriptionMessage);
        
        const toAdd = ", Bring a candy for him\n";

        if (!description) { // include description only if description is false
            message = message + toAdd
        } else { // remove description message
            const newString = message.replace(toAdd, "");
            message = newString
        }
        
    };

    const printMessage = () => {
        if(!onOff) {
            toast.info(message)
        }
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

            <div>
                <button onClick={printMessage}>Print Notification</button>
            </div>


            <ToastContainer
                position="top-right"
                autoClose = {5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick = {true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkMode}
            
            />
        </div>
  
    );
}

export default NotificationSettings;