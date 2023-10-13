import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import About from './Components/About/About';
import Home from './Components/Home/Home'; 
import CalendarComponent from './Components/Calendar/CalendarComponent';
import UserProfile from './Components/UserProfile/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
}
 
export default App;
