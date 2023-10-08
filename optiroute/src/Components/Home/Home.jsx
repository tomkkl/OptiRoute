import "./Home.css";
import React, { useState } from 'react'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import phone_icon from '../Assets/phone.png'
import password_icon from '../Assets/password.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // Navigate to PW reset
  const navigate = useNavigate();
    //Change to work with Mongo
    //State does not work as well
    
  const [action,setAction] = useState("Home");

  return (
    <div className='container'>
        <div className ='header'>
        <div className='text'>{action}</div>
            under header stuff put stuff here lol
        </div>
    <div className='submit-container'>
        <div className={action ==="Home"?"submit":"submit gray"} onClick={()=>{navigate("/login")}}>Sign Up Now!</div>
            </div>
    </div>
  )
}

export default Home;