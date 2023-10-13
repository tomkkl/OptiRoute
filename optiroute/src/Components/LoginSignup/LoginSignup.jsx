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
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  const [signUpPhone, setSignUpPhone] = useState(false);
  const [loginPhone, setLoginPhone] = useState(false);
  const [name, setName] = useState('');
  const [telEmail, setTelEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const responce = await fetch('/api/users')
      const json = await responce.json()

      if(responce.ok){
          setUsers(json)
          console.log("Got users")
      }
    }
    fetchUsers()
  }, [])

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeTelEmail = async event => {
    setTelEmail(event.target.value);
  };
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleChangeSecurityQuestion = event => {
    setSecurityQuestion(event.target.value);
  };

  
  


  const handleClick =  async event => {
    if(action ==="Sign Up"){
        //Do a check to see if all required fields are filled out

        //Do a check if the email, phone number, or username is already in use
        // {users && user
        //     console.log(user.id)
        // if(user.email == {telEmail}){
        //     console.log("Bade Email")
        // }
        // }

        //console.log(users)
        for(i = 0; i <users.length; i++){
            // console.log(users[i].email)
            if(!signUpPhone){
                if(users[i].email === telEmail){
                    console.log("BAD EMAIL CAUGHT")
                    setError("Email is taken")
                    return;
                    break;
                }
            } else {
                if(users[i].phoneNumber === telEmail){
                    console.log("BAD Phone Number CAUGHT")
                    setError("Phone Number is taken")
                    return;
                    break;
                }
            }
            if(users[i].name === name){
                console.log("BAD Name CAUGHT")
                setError("Name is taken")
                return;
                break;
            }

        }
        //console.log(users.length)

        //Do check if email or phone number
        console.log("SIGNUP")
        event.preventDefault();
        var userinsert = null;
        if(!signUpPhone){
            userinsert = {name, email:telEmail, password, securityQuestion}
        } else {
            userinsert = {name, phoneNumber:telEmail, password, securityQuestion}
        }


        const response = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify(userinsert),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok) {
            setError(null)
            console.log('new user added', json)
            {navigate("/home")}
    
        }
    } else {
        //Do check if email or phone number
        console.log("LOGIN")
    }
  };

  const [action,setAction] = useState("Sign Up");

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
                <input id = "name" type='text' placeholder='Name' onChange={handleChangeName}
                value = {name}/>
                
            </div>}
            <div className='input'>
                    <img src={(action === "Sign Up" ? signUpPhone : loginPhone) ? phone_icon : email_icon} alt=''/>
                    <input 
                        id = "telEmail"
                        type={(action === "Sign Up" ? signUpPhone : loginPhone) ? 'tel' : 'email'} 
                        placeholder={(action === "Sign Up" ? signUpPhone : loginPhone) ? 'Phone Number' : 'Email'}
                        onChange={handleChangeTelEmail}
                        value = {telEmail}
                    />
                    </div>
            <div className='input'>
                <img src={password_icon} alt=''/>
                <input
                    id = "password" 
                    type='password' placeholder='Password'
                    onChange={handleChangePassword}
                    value = {password}/>
            </div>
            {action === "Sign Up" && (
                <div className='input'>
                    <img src={user_icon} alt=''/>
                    <input 
                    type='security_question' 
                    placeholder='Security Question 1'
                    onChange={handleChangeSecurityQuestion}
                    value = {securityQuestion}/>
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
            <div className="submit" onClick={handleClick}>Submit</div>
            {action === "Login" && <div className="submit" onClick={() => {navigate("/reset-password")}}>Forgot Password?</div>}
        </div>
        {error && <div className='error'>{error}</div>}
        
    </div>
  )
}

export default LoginSignup
