import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DarkModeToggle = () => {
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
  
    return (
      <div>
        <label>Toggle Dark Mode:</label>
        <input type="checkbox" checked={darkModeEnabled} onChange={toggleDarkMode} />
        <p>drkboolean: {darkModeEnabled.toString()}</p>
      </div>
    );
  };

  export default DarkModeToggle;