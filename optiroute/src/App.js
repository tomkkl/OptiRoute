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
import Map from './Components/MapV2/MapV2';
import All_search from './Components/All_search/All_search.jsx';
import SearchByDates from './Components/SearchByDates/SearchByDates';
import NotificationSetting from './Components/NotificationSetting/NotificationSetting';
import { ReactSession } from 'react-client-session';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import "react-datetime/css/react-datetime.css";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import FindFriends from './Components/FindFriends/FindFriends.jsx';
import FriendRequests from './Components/FriendRequests/FriendRequests.jsx';
import FindExistingFriends from './Components/FindExistingFriends/FindExistingFriends.jsx';
import emailjs from '@emailjs/browser'



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
    const expireTime = Date.now() + 100000000000;

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


  const send_message = async (object) => {
    const userId = ReactSession.get('user_id');

    try {
      const response = await fetch(`/api/NotificationSetting?user_id=${userId}`);
      const users = await response.json();
      console.log(users)
      const current_user = users.filter((event) => event.user_id === userId)[0];
      console.log(current_user.email)

      const text = (current_user.title ? "Title: " + object.title + ",\n" : "") + (current_user.date_time ? "Starting at: " + object.notification_time : "") +
        (current_user.location ? "Location: " + object.location : "") + (current_user.address ? "Address: " + object.address : "") +
        (current_user.description ? "Location: " + object.description : "");

      if (current_user.email) {

        // Add logic to send a test message
        const form = document.createElement('form');
        form.style.display = 'none';

        // Add input fields for message, email, and title
        const messageInput = document.createElement('input');
        messageInput.type = 'text';
        messageInput.name = 'message';
        messageInput.value = text; // Replace with your actual message
        form.appendChild(messageInput);

        const emailInput = document.createElement('input');
        emailInput.type = 'text';
        emailInput.name = 'email';
        emailInput.value = current_user.email_address;// Use the stored email address or replace it with a default/test email
        form.appendChild(emailInput);

        // Append the form to the body
        document.body.appendChild(form);
        emailjs
          .sendForm('service_mg8oh6d', 'template_llr8y8a', form, 'nsNXmsj_H0dyrU3zA')
          .then(
            (response) => {
              console.log('Email sent successfully:', response);
              window.alert('Test message sent!');
            },
            (error) => {
              console.error('Failed to send email:', error);
              window.alert('Failed to send test message.');
            }
          ).finally(() => {
            // Remove the hidden form from the body after submission
            document.body.removeChild(form);
          });

      }

      if (current_user.phone) {
        const apiUrl = "https://textflow.me/api/send-sms";
        const phoneNumber = "+1" + current_user.phone_address;
        const textMessage = text;
        const apiKey = "ipuRM7I1xzp4Ent0QjttMUgoxLhcNLd1TxNsFMuX9SKM8KJezjtC6nBc9Xc2K4Y3"; // Replace with your actual API key

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              phone_number: phoneNumber,
              text: textMessage,
            }),
          });

          if (response.ok) {
            console.log('SMS sent successfully!');
          } else {
            console.error('Failed to send SMS:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending SMS:', error.message);
        }
      }

      // Add logic to fetch and set other notification-related data if needed
    } catch (error) {
      console.error('Error fetching user data:', error);
    }



  };

  const checkSomethingEvery60Seconds = async () => {
    try {
      // Add your logic to check something here
      console.log('Checking something every 30 seconds');
      // For example, you might want to fetch data from the server
      if (ReactSession.get('user_id') != null) {
        const userId = ReactSession.get('user_id');
        try {
          const response = await fetch(`/api/events?user_id=${userId}`);
          const users = await response.json();
          console.log(users)
          const events = users.filter((event) => event.user_id === userId);
          if (events !== undefined) {

            if (events.length > 0) {

              // Loop through each event
              events.map((event) => {
                console.log('Event:', event);

                // You can access properties of each event, e.g., event.title, event.start, etc.
                console.log('Title:', event.notification_time);
                const notification_time = event.notification_time;
                const currentUTC = new Date().toJSON();
                console.log(currentUTC)

                const isSameDateTime = String(notification_time).slice(0, 16) === String(currentUTC).slice(0, 16);
                if (isSameDateTime) {
                  send_message(event);
                }

                return null; // React requires a return value in a map function
              });
            } else {
              console.log("No events");
            }

          } else {
            console.log("There is no evnet")
          }

          // Add logic to fetch and set other notification-related data if needed
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log("not logged in")
      }
    } catch (error) {
      console.error('Error checking something:', error);
    }
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
    // Call the checkSomethingEvery60Seconds function periodically
    const checkInterval = setInterval(() => {
      checkSomethingEvery60Seconds();
    }, 60 * 1000); // 60 seconds
    return () => clearInterval(checkInterval);
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
        <Route path="/find-friends" element={<FindFriends />} />
        <Route path="/friend-requests" element={<FriendRequests />} />
        <Route path="/friend-list" element={<FindExistingFriends />} />
        <Route path="/notification_setting" element={<NotificationSetting />} />
      </Routes>
      <Modal
        isOpen={showTimeoutModal}
        contentLabel="Session Timeout"
        className="custom-modal"
        overlayClassName="custom-overlay"
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