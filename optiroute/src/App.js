import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import CalendarMain from './Components/Calendar_v2/CalendarMain.jsx';
import UserProfile from './Components/UserProfile/UserProfile';
import Search from './Components/Search/Search';
import Category from './Components/Category/Category.jsx';
import Recurrence from './Components/Recurrence/Recurrence';
import Map from './Components/Map/Map';
import All_search from './Components/All_search/All_search.jsx';
import SearchByDates from './Components/SearchByDates/SearchByDates';
import NotificationSetting from './Components/NotificationSetting/NotificationSetting';
import { ReactSession } from 'react-client-session';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import "react-datetime/css/react-datetime.css";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function App() {
  ReactSession.setStoreType("localStorage");
  const [loggedIn, setLoggedIn] = useState(true);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const navigate = useNavigate();

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
      console.log("Log out");
      setLoggedIn(false);
    } else if (expireTime - Date.now() < 5000) {
      // Show the modal if the session is about to expire in the next 5 seconds
      setShowTimeoutModal(true);
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 100000;

    localStorage.setItem("expireTime", expireTime);
  }

  const handleStay = () => {
    setShowTimeoutModal(false);
    updateExpireTime();
  };

  const handleLeave = () => {
    setShowTimeoutModal(false);
    setLoggedIn(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    updateExpireTime();

    window.addEventListener('click', updateExpireTime);
    window.addEventListener('keypress', updateExpireTime);
    window.addEventListener('scroll', updateExpireTime);
    window.addEventListener('mousemove', updateExpireTime);

    return () => {
      window.removeEventListener('click', updateExpireTime);
      window.removeEventListener('keypress', updateExpireTime);
      window.removeEventListener('scroll', updateExpireTime);
      window.removeEventListener('mousemove', updateExpireTime);
    }

  }, []);

  useEffect(() => {
    if (!loggedIn) {
      // Redirect to the login page
      navigate('/login');
      window.location.reload();
      ReactSession.set('user_id', null)
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    let timeout;
    if (showTimeoutModal) {
      timeout = setTimeout(() => {
        // Close the modal and bring to the login page after 10 seconds
        setShowTimeoutModal(false);
        setLoggedIn(false);
      }, 20000);
    }

    return () => clearTimeout(timeout);
  }, [showTimeoutModal]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<CalendarMain />} />
        {/* <Route path="/calendar" element={<CalendarComponent />} /> */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/SBD" element={<SearchByDates />} />
        <Route path="/category" element={<Category />} />
        <Route path="/recurring-events" element={<Recurrence />} />
        <Route path="/map" element={<Map />} />
        <Route path="/multi_filter" element={<All_search />} />
        <Route path="/notification_setting" element={<NotificationSetting />} />
      </Routes>
      <Modal
        isOpen={showTimeoutModal}
        contentLabel="Session Timeout"
      >
        <div>
          <p>Are you still here?</p>
          <button onClick={handleStay}>Yes</button>
          <button onClick={handleLeave}>No</button>
        </div>
      </Modal>
    </>
  );
}

export default App;
