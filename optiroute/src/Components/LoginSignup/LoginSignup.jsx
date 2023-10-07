import React, { useState } from 'react';
import { useEffect } from 'react';
import './LoginSignup.css';
import jwt_decode from "jwt-decode";
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import phone_icon from '../Assets/phone.png'
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';
import { LoginSocialFacebook} from 'reactjs-social-login';
import {FacebookLoginButton} from "react-social-login-buttons";

const LoginSignup = () => {
    // Navigate to PW reset
  const navigate = useNavigate();
    //Navigate to PW reset
    //Change to work with Mongo
    //State does not work as well

  const[profile, setProfile] = useState(null);


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
  const [signUpPhone, setSignUpPhone] = useState(false);
  const [loginPhone, setLoginPhone] = useState(false);
  return (
    <div className='container'>
        <div className ='header'>
        <div className='text'>{action}</div>
                {action === "Sign Up" ? (
                    <button
                        onClick={() => setSignUpPhone(!signUpPhone)}
                        className="phone-user"
                    >
                        Sign up by {signUpPhone ? "Email" : "Phone Number"}
                    </button>
                ) : (
                    <button
                        onClick={() => setLoginPhone(!loginPhone)}
                        className="phone-user"
                    >
                        Login by {loginPhone ? "Email" : "Phone Number"}
                    </button>
                )}
                <div className='underline'></div>
        </div>
        <div className='inputs'></div>
            {action==="Login"?<div></div> :<div className='input'>
                <img src={user_icon} alt=''/>
                <input type='text' placeholder='Name'/>
                
            </div>}
            <div className='input'>
                    <img src={(action === "Sign Up" ? signUpPhone : loginPhone) ? phone_icon : email_icon} alt=''/>
                    <input 
                        type={(action === "Sign Up" ? signUpPhone : loginPhone) ? 'tel' : 'email'} 
                        placeholder={(action === "Sign Up" ? signUpPhone : loginPhone) ? 'Phone Number' : 'Email'}
                    />
                    </div>
            <div className='input'>
                <img src={password_icon} alt=''/>
                <input type='password' placeholder='Password'/>
            </div>
            {action === "Sign Up" && (
                <div className='input'>
                    <img src={user_icon} alt=''/>
                    <input type='security_question' placeholder='Security Question 1'/>
                </div>
            )}
            <div>
            {!profile ? <LoginSocialFacebook
                appID="172918275855498"
                onResolve={(responce) =>{
                    console.log(responce);
                    setProfile(responce.data)
                }}
                onReject={(error) => {
                    console.log(error);
                }}
            >
                <FacebookLoginButton/>
            </LoginSocialFacebook>: ''}
            </div>
            <div id = "signInGoogleDiv"> </div>

        <div className='submit-container'>
            <div className={action ==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action ==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            {action === "Login" && <div className="submit" onClick={() => {navigate("/reset-password")}}>Forgot Password?</div>}
        </div>
    </div>
  )
}

export default LoginSignup
