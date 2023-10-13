import React, { useState } from 'react'
import { useEffect } from 'react'
import './ResetPassword.css'
import jwt_decode from "jwt-decode";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useNavigate } from 'react-router-dom';
import phone_icon from '../Assets/phone.png'

const ResetPassword = () => {

    const [users, setUsers] = useState(null)
    const [telEmail, setTelEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
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

    const handleChangeTelEmail = async event => {
        setTelEmail(event.target.value);
    };

    const handleChangeSecurityQuestion = event => {
        setSecurityQuestion(event.target.value);
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    const handleClick = async event => {
        console.log("here")
        for (let i = 0; i < users.length; i++) {
            // console.log(users[i].email)
            //Change so it does different ifs for phone and tel
            if (users[i].email === telEmail || users[i].phoneNumber === telEmail) {
                if (users[i].securityQuestion === securityQuestion) {
                    console.log("LOGGED IN YIPEEEE")
                    users[i].password = password
                    console.log(users[i]._id)
                    const response = await fetch('/api/users/' + users[i]._id, {
                        method: "PATCH",
                        body: JSON.stringify(users[i]),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const json = await response.json()

                    // if (!response.ok) {
                    //     setError(json.error)
                    // }

                    if (response.ok) {
                        // setError(null)
                        console.log('new user updated', json)
                        { navigate("/home") }

                    }
                } else {
                    //Handle errors
                    // setError("INVALID LOGIN CREDENTIALS");
                    // return;
                }
            } else {
                console.log("Not Valid")
            }
        }
    }

    // Navigate to PW reset
    const navigate = useNavigate();
    //Change to work with Mongo
    //State does not work as well
    const [user, setUser] = useState({});
    const [action, setAction] = useState("Reset Password");
    const [phone, setPhone] = useState(false);
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                {action === "Reset Password" && (
                    <button
                        onClick={() => setPhone(!phone)}
                        className="phone-user"
                    >
                        Reset with {phone ? "Email" : "Phone Number"}
                    </button>
                )}
                <div className='underline'></div>
            </div>
            <div className='inputs'></div>
            <div className='input'>
                <img src={phone ? phone_icon : email_icon} alt='' />
                <input
                    type={phone ? 'tel' : 'email'}
                    placeholder={phone ? 'Phone Number' : 'Email'}
                    onChange={handleChangeTelEmail}
                    value={telEmail}
                />
            </div>

            <div className='input'>
                <img src={password_icon} alt='' />
                <input type='password' placeholder='New Password'
                    onChange={handleChangePassword}
                    value={password}
                />

            </div>

            <div className='input'>
                <img src={password_icon} alt='' />
                <input type='phrase' placeholder='Security Phrase'
                    onChange={handleChangeSecurityQuestion}
                    value={securityQuestion}
                />
            </div>
            <div className='submit-container'>
                <div className={action === "Reset" ? "submit gray" : "submit"} onClick={handleClick}>Confirm Reset</div>
                <div className={action === "Back" ? "submit gray" : "submit"} onClick={() => { navigate("/login") }}>Back To Login</div>
            </div>
        </div>
    )
}

export default ResetPassword;