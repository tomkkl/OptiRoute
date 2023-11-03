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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import "react-datetime/css/react-datetime.css";


function App() {
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
      </Routes>
    </>
  );
}
 
export default App;
