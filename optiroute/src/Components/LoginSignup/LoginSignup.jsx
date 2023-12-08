import React, { useState } from 'react';
import { useEffect } from 'react';
import './LoginSignup.css';
import jwt_decode from "jwt-decode";
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import phone_icon from '../Assets/phone.png'
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from "react-social-login-buttons";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactSession } from "react-client-session"


const LoginSignup = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [user, setUser] = useState({});


    const insertUser = async event => {

        var userinsert;
        console.log(user)
        userinsert = { name: user.name, email: user.email, phoneNumber: "", password: user.sub }



        const response = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify(userinsert),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            // setError(json.error)
        }

        if (response.ok) {
            setError(null)
            console.log('google user added', json)
            console.log('google user id: ' + json._id)
            ReactSession.set('user_id', json._id)
            navigate("/profile", { state: { userId: json._id } });
        }
    }

    function handleCallBackResponse(responce) {
        // console.log("Encoded JWT ID token" + responce.credential);
        // console.log("\n")
        var userObject = jwt_decode(responce.credential);
        console.log(userObject)
        setUser(userObject)

        console.log("PARTS\n")
        console.log(user)

        document.getElementById("signInGoogleDiv").hidden = true;
    }
    useEffect(() => {
        /* global google */
        if (window.google && window.google.accounts && window.google.accounts.id) {
            google.accounts.id.initialize({
                client_id: "API KEY.apps.googleusercontent.com",
                callback: handleCallBackResponse
            });

            google.accounts.id.renderButton(
                document.getElementById("signInGoogleDiv"),
                { theme: "outline", size: "large" }
            )
        }
    }, []);

    useEffect(() => {
        // This code will run after the state has been updated
        if (user != null) {
            insertUser();
        }
    }, [user]); // useEffect will be triggered whenever the 'user' state changes


    const [signUpPhone, setSignUpPhone] = useState(false);
    const [loginPhone, setLoginPhone] = useState(false);
    const [loginUsername, setLoginUsername] = useState(false);
    const [name, setName] = useState('');
    const [telEmail, setTelEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState(null)

    useEffect(() => {
        setError(null)
        const fetchUsers = async () => {
            const responce = await fetch('/api/users')
            const json = await responce.json()

            if (responce.ok) {
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


    const handleClick = async event => {

        if (action === "Sign Up") {
            //Do a check to see if all required fields are filled out
            if (telEmail.length == 0) {
                if (signUpPhone) {
                    console.log("Phone is empty")
                    setError("Phone is empty")
                    return;
                } else {
                    console.log("Email is empty")
                    setError("Email is empty")
                    return;
                }

            } else if (name.length == 0) {
                console.log("Name too short")
                setError("Name is empty")
                return;
            } else if (password.length <= 7) {
                console.log("Password is less than 7 characters")
                setError("Password is less than 7 characters")
                return;
            } else if (securityQuestion == 0) {
                console.log("Security Question is empty")
                setError("Security Question is empty")
                return;
            }
            //console.log(users)
            for (let i = 0; i < users.length; i++) {
                // console.log(users[i].email)
                if (!signUpPhone) {
                    if (users[i].email === telEmail) {
                        console.log("BAD EMAIL CAUGHT")
                        setError("Email is taken")
                        return;
                        break;
                    }
                } else {
                    if (users[i].phoneNumber === telEmail) {
                        console.log("BAD Phone Number CAUGHT")
                        setError("Phone Number is taken")
                        return;
                        break;
                    }
                }
                if (users[i].name === name) {
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
            if (!signUpPhone) {
                userinsert = { name, email: telEmail, phoneNumber: "", password, securityQuestion }
            } else {
                userinsert = { name, email: "", phoneNumber: telEmail, password, securityQuestion }
            }


            const response = await fetch('/api/users', {
                method: "POST",
                body: JSON.stringify(userinsert),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            if (!response.ok) {
                console.log(json.error)
                // setError(json.error)
            }

            if (response.ok) {
                setError(null)
                console.log('new user added', json)
                console.log('new user id: ' + json._id);
                ReactSession.set('user_id', json._id)
                navigate("/profile", { state: { userId: json._id } });
            }

            fetch('/api/NotificationSetting', {
                method: 'POST',
                body: JSON.stringify({ user_id: String(json._id), phone: false, email: false, title: false, date_time: false, location: false, address: false, description: false, email_address: "none", phone_address: "none" }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
                .catch((error) => {
                    console.error('Error adding event:', error);
                });


        } else if (action === "Login") {
            console.log("Username is: " + telEmail)
            console.log("Password is: " + password)
            if (telEmail.length == 0) {
                if (loginPhone) {
                    console.log("Phone is empty")
                    setError("Phone is empty")
                    return;
                } else if (loginUsername) {
                    console.log("Username is empty")
                    setError("Username is empty")
                    return;
                } else {
                    console.log("Email is empty")
                    setError("Email is empty")
                    return;
                }
            } else if (password.length == 0) {
                setError("Password is empty")
                return;
            }


            //Do check if email or phone number
            for (let i = 0; i < users.length; i++) {
                // console.log(users[i].email)
                if (users[i].email === telEmail || users[i].phoneNumber === telEmail || users[i].name === telEmail) {
                    if (users[i].password === password) {

                        console.log("LOGGED IN YIPEEEE")
                        console.log("LOGGED IN ID: " + users[i]._id)
                        ReactSession.set('user_id', users[i]._id)
                        navigate("/profile", { state: { userId: users[i]._id } });
                    } else {
                        setError("INVALID LOGIN CREDENTIALS");
                        console.log("INVALID LOGIN CREDENTIALS")
                        return;
                    }
                }
            }
            setError("INVALID LOGIN CREDENTIALS");
            return;

        } else {
            console.log("LOGIN SIGNUP MESSED UP")
        }
    };

    const [action, setAction] = useState("Sign Up");

    return (
        <div className='container'>

            <div className='header'>
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
                        onClick={() => (setLoginPhone(true), setLoginUsername(false))}
                        className="phone-user"
                    >
                        Login with Phone Number

                    </button>
                )}
                {action === "Sign Up" ? (
                    null
                ) : (
                    <button
                        onClick={() => (setLoginPhone(false), setLoginUsername(true))}
                        className="phone-user"
                    >
                        Login with Username

                    </button>

                )}
                {action === "Sign Up" ? (
                    null
                ) : (
                    <button
                        onClick={() => (setLoginPhone(false), setLoginUsername(false))}
                        className="phone-user"
                    >
                        Login with Email

                    </button>

                )}
            </div>
            <div className='inputs'></div>
            {action === "Login" ? <div></div> : <div className='input'>
                <img src={user_icon} alt='' />
                <input id="name" placeholder='Name' onChange={handleChangeName}
                    value={name} />

            </div>}
            <div className='input'>
                <img src={(action === "Sign Up" ? signUpPhone : loginPhone) ? phone_icon : email_icon} alt='' />
                <input
                    id="telEmail"
                    type={(action === "Sign Up" ? signUpPhone : loginPhone) ? 'tel' : 'email'}
                    placeholder={(action === "Sign Up" ? signUpPhone : loginPhone) ? 'Phone Number' :
                        (loginUsername ? "Username" : "Email")

                    }
                    onChange={handleChangeTelEmail}
                    value={telEmail}
                />
            </div>
            <div className='input'>
                <img src={password_icon} alt='' />
                <input
                    id="password"
                    type='password' placeholder='Password'
                    onChange={handleChangePassword}
                    value={password} />
            </div>
            {action === "Sign Up" && (
                <div className='input'>
                    <img src={user_icon} alt='' />
                    <input
                        type='security_question'
                        placeholder='Security Phrase'
                        onChange={handleChangeSecurityQuestion}
                        value={securityQuestion} />
                </div>
            )}
            {error && <div className='error-container'>
                <div className='error'>{error}</div>
            </div>}
            <div id="signInGoogleDiv"></div>


            <div className='submit-container'>
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
                <div className="submit" onClick={handleClick}>Submit</div>
                {action === "Login" && <div className="submit" onClick={() => { navigate("/reset-password") }}>Forgot Password?</div>}
            </div>

        </div>
    )
}

export default LoginSignup