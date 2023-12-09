import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { ReactSession } from "react-client-session"
import Sidebar from '../Sidebar/Sidebar';

const UserProfile = () => {
  const navigate = useNavigate()
  const [invalidAccess, setInvalidAccess] = useState(false);
  const userId = ReactSession.get("user_id");

  useEffect(() => {
    if (!userId) {
      alert("Invalid access. Please login first.");
      setInvalidAccess(true);
      navigate("/");
    }
  }, []);

  ///////////////////////////////// Backend Data Transfer Start
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const responce = await fetch('/api/users/' + userId)
      const json = await responce.json()
      if (responce.ok) {

        setUser(json)
        console.log("GOTH TSIEHEISJSLK")
        // set everything
        setName(json.name)
        setEmail(json.email)
        setPhone(json.phoneNumber)
        try {
          console.log("try")
          setBio(json.bio)
        } catch {
          console.log("catch")
          setBio("")
        }

      }
    }
    fetchUser()
  }, [])

  const fetchUserData = async () => {
    const response = await fetch('/api/users/' + userId);
    const json = await response.json();
    if (response.ok) {
      setUser(json);
      setName(json.name);
      setEmail(json.email);
      setPhone(json.phoneNumber);
      setBio(json.bio || "");
    }
  };

  ///////////////////////////////// Update Username Start
  const [newUsername, setNewUsername] = useState('');

  // Function to handle username updates
  const handleUsernameUpdate = async event => {

    console.log("name")
    user.name = newUsername
    const response = await fetch('/api/users/' + userId, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (response.ok) {
      // setError(null)
      console.log('name changed')
      console.log('new name: ' + user.name)
      fetchUserData()
    }
    setNewUsername('');
  };
  ///////////////////////////////// Update Username End

  /////////////////////////////// Update Email Address Start
  const [newEmail, setNewEmail] = useState('');

  // Function to handle Email updates
  const handleEmailUpdate = async event => {
    console.log("email")
    user.email = newEmail
    const response = await fetch('/api/users/' + userId, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log('email changed')
      console.log('new email: ' + user.email)
      fetchUserData();
    }

    setNewEmail('');
  };
  /////////////////////////////// Update Email Address End


  /////////////////////////////// Update Bio Start
  const [newBio, setNewBio] = useState('');

  const handleBioUpdate = async event => {
    // Perform validation and update logic here
    console.log("bio")
    user.bio = newBio
    const response = await fetch('/api/users/' + userId, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log('bio changed')
      console.log('new bio: ' + user.bio)
      fetchUserData();
    }

    setNewBio('');
  };
  /////////////////////////////// Update Bio End

  /////////////////////////////// Update Phone Number Start
  const [newPhonenumber, setNewPhonenumber] = useState('');
  // Function to handle Email updates
  const handlePhonenumberUpdate = async event => {

    console.log("phone")
    user.phoneNumber = newPhonenumber
    const response = await fetch('/api/users/' + userId, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      // setError(null)
      console.log('phone changed')
      console.log('new phone: ' + user.phoneNumber)
      fetchUserData();
    }
    setNewPhonenumber(''); // Clear the input field
  };
  /////////////////////////////// Update Phone Number End

  ////////////////////////////// Delete Profile Start
  const [showDialog, setShowDialog] = useState(false);
  const deleteProfile = () => {
    setShowDialog(true);
  }

  const executeProfileDelete = async event => {
    const response = await fetch('/api/users/' + userId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (response.ok) {
      alert("Your account has been successfully deleted.")
    }
    navigate("/login")
  }
  ////////////////////////////// Delete Profile (Ben) End

  ////////////////////////////// RETURN
  return (
    <>
      <div className="user-profile">
        <div className='user-profile-container'>
          <Sidebar />
          <div className='user-profile-content'>
            {invalidAccess ? null : (
              <div className='profile-container'>
                <div className='header'>
                  <div className='text'>Profile Settings</div>
                  <div className='underline'></div>
                </div>

                <div className='section'>
                  <div className='section-header'>
                    <span className='section-header-icon'>👤</span> {/* Icon for the section */}
                    <h1>Username: {name} </h1>
                  </div>
                  <div className='inputs'>
                    <div className='input'>
                      <input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Enter new username"
                      />
                    </div>
                  </div>
                  <div className="submit2" onClick={handleUsernameUpdate}>Update Username</div>

                </div>

                <div className='section'>
                  <div className='section-header'>
                    <span className='section-header-icon'>📧</span> {/* Icon for the section */}
                    <h1>Email: {email} </h1>
                  </div>
                  <div className='inputs'>
                    <div className='input'>
                      <input
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter new Email"
                      />
                    </div>
                  </div>
                  <div className="submit2" onClick={handleEmailUpdate}>Update Email</div>
                </div>

                <div className='section'>
                  <div className='section-header'>
                    <span className='section-header-icon'>📞</span> {/* Icon for the section */}
                    <h1>Phone Number: {phone} </h1>
                  </div>
                  <div className='inputs'>
                    <div className='input'>
                      <input
                        value={newPhonenumber}
                        onChange={(e) => setNewPhonenumber(e.target.value)}
                        placeholder="Enter new phone number"
                      />
                    </div>
                  </div>
                  <div className="submit2" onClick={handlePhonenumberUpdate}>Update Phone Number</div>
                </div>

                <div className='section'>
                  <div className='section-header'>
                    <span className='section-header-icon'>📝</span> {/* Icon for the section */}
                    <h1>Bio: {bio} </h1>
                  </div>
                  <div className='inputs'>
                    <div className='input'>
                      <textarea
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        placeholder="Enter new bio"
                        rows="4"  // Adjust the number of rows as needed
                      />
                    </div>
                  </div>
                  <div className="submit2" onClick={handleBioUpdate}>Update Bio</div>

                </div>

                <div className='section'>
                  <div className="delete" onClick={deleteProfile}>Delete Profile</div>
                </div>

                {/* Profile Deletion Section */}
                {showDialog && (
                  <div className="confirmation-dialog">
                    <p>Are you sure you want to delete your profile?</p>
                    <button onClick={() => {
                      executeProfileDelete();
                      setShowDialog(false);
                    }}>
                      Confirm
                    </button>
                    <button onClick={() => {
                      setShowDialog(false);
                    }}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile