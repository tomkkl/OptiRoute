import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import CalendarComponent from './Components/Calendar/CalendarComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/calendar" element={<CalendarComponent />} />
      </Routes>
    </>
  );
}

export default App;
