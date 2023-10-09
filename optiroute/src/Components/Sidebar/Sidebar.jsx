import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/">Home</Link>
            <Link to="/about">About Team 17</Link>
            <Link to="/login">Login/Signup</Link>
        </div>
    );
};

export default Sidebar;
