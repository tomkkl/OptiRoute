import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import logo from '../Assets/logo.png'

import './Home.css';
import Description from '../Description/Description';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Sidebar />

      <div className='main-content'>
        <div className='header'>
          <img src={logo} alt="logo" className="logo-image" />
          <div className='text'>optiroute</div>
          <Description />
          <div className='submit-container'>
            <div className="submit" onClick={() => { navigate("/login") }}>Sign Up Now!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
