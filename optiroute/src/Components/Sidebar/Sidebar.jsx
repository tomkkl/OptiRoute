import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { ReactSession } from 'react-client-session';

const Sidebar = () => {
    const userId = ReactSession.get('user_id');

    return (
        <div className='sidebar'>
            <Link to="/">Home</Link>
            <Link to="/about">About Team 17</Link>
            {userId ? (
                <>
                    <Link to="/calendar">Calendar</Link>
                    <Link to="/notification_setting">Notification</Link>
                    <Link to="/find-friends">Find Friends</Link>
                    <Link to="/login">Login/Signup</Link>
                </>
            ) : (
                <Link to="/login">Login/Signup</Link>
            )}
        </div>
    );
};

export default Sidebar;