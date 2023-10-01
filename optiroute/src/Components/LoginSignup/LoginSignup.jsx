import React, { useState } from 'react'
import { useEffect } from 'react'
import './LoginSignup.css'
import jwt_decode from "jwt-decode";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {
    //Change to work with Mongo
    //State does not work as well
  const [user, setUser ] = useState({});

  function handleCallBackResponse(responce){
    console.log("Encoded JWT ID token" + responce.credential);
    var userObject = jwt_decode(responce.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInGoogleDiv").hidden = true;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
        client_id: "984345413432-64d1vhk7u12h3iodbbft1s3435nc5i00.apps.googleusercontent.com",
        callback: handleCallBackResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("signInGoogleDiv"),
        { theme: "outline", size: "large"}
    )
  }, []);

  const [action,setAction] = useState("Sign Up");
  return (
    <div className='container'>
        <div className ='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'></div>
            {action==="Login"?<div></div> :<div className='input'>
                <img src={user_icon} alt=''/>
                <input type='text' placeholder='Name'/>
            </div>}
            <div className='input'>
                <img src={email_icon} alt=''/>
                <input type='email' placeholder='Email'/>
            </div>
            <div className='input'>
                <img src={password_icon} alt=''/>
                <input type='password' placeholder='Password'/>
            </div>
            <div id = "signInGoogleDiv">

            </div>
        {action ==="Sign Up"?<div ></div>  :<div className="forgot-password">Lost Password? <span>Click Here</span></div>}
        <div className='submit-container'>
            <div className={action ==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action ==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignup
