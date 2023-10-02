import React, { useState } from 'react'
import { useEffect } from 'react'
import './ResetPassword.css'
import jwt_decode from "jwt-decode";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    // Navigate to PW reset
  const navigate = useNavigate();
    //Change to work with Mongo
    //State does not work as well
  const [user, setUser] = useState({});

  const [action,setAction] = useState("Reset Password");
  return (
    <div className='container'>
        <div className ='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'></div>
            <div className='input'>
                <img src={email_icon} alt=''/>
                <input type='email' placeholder='Email'/>
            </div>
            <div className='input'>
                <img src={password_icon} alt=''/>
                <input type='password' placeholder='Security Question 1 Answer'/>
            </div>
        <div className='submit-container'>
            <div className={action ==="Reset"?"submit gray":"submit"} onClick={()=>{
                // do mongodb checking,
                // if all good, display a thing that says password reset
                // else display a error stating one of the info is wrong
            }}>Confirm Reset</div>
            <div className={action ==="Back"?"submit gray":"submit"} onClick={()=>{navigate("/")}}>Back To Login</div>
        </div>
    </div>
  )
}

export default ResetPassword;