import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Notification from '../Notifications/Notifications';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/">Home</Link>
            <Link to="/about">About Team 17</Link>
            <Link to="/login">Login/Signup</Link>
            <Link to="/calendar">Calendar</Link>
          

        </div>
    );
};

export default Sidebar;
