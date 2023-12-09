import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { ReactSession } from 'react-client-session';

const Sidebar = () => {
    const userId = ReactSession.get('user_id');
    const navigate = useNavigate();

    const handleLogout = () => {
        ReactSession.set('user_id', null);
        navigate('/');
        window.location.reload();
    };

    return (
        <div className='sidebar'>
            <Link to="/">Home</Link>
            <Link to="/about">About Team 17</Link>
            {userId ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/calendar">Calendar</Link>
                    <Link to="/notification_setting">Notification</Link>
                    <Link to="/find-friends">Find Friends</Link>
                    <Link to="/friend-list">Friend List</Link>
                    <Link to="/friend-requests">Friend Requests</Link>
                    <button onClick={handleLogout}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#fff', // Text color
                            transition: 'background-color 0.3s',
                            textAlign: 'left', // Align text to the left
                            paddingLeft: 0, // Remove left padding
                            fontWeight: 'bold', // Set font weight
                        }}>Logout</button>                </>
            ) : (
                <Link to="/login">Login/Signup</Link>
            )
            }
        </div >
    );
};

export default Sidebar;