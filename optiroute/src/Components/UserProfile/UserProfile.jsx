import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './UserProfile.css';
import logo from '../Assets/logo.png'

const UserProfile = () => {
  const navigate = useNavigate()

  const location = useLocation();

  const [invalidAccess, setInvalidAccess] = useState(false);

  useEffect(() => {
    if (!location.state || !location.state.userId) {
      alert("Invalid access. Please login first.");
      setInvalidAccess(true);
      navigate("/");
    }
  }, []);

  const userId = location.state?.userId;
  //console.log("USERPROFILE: " + userId);

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
      setBio(json.bio || ""); // Use the OR operator to default to an empty string if bio is undefined
    }
  };

  ///////////////////////////////// Backend Data Transfer End

  const fileInputRef = useRef(null);

  ///////////////////////////////// Update Username Start
  const [currentUsername, setCurrentUsername] = useState(name);
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

    // if (!response.ok) {
    //     setError(json.error)
    // }

    if (response.ok) {
      // setError(null)
      console.log('name changed')
      console.log('new name: ' + user.name)
      fetchUserData()
    }
    setNewUsername(''); // Clear the input field
  };
  ///////////////////////////////// Update Username End


  /////////////////////////////// Update Email Address Start
  const [currentEmail, setCurrentEmail] = useState(email);
  const [newEmail, setNewEmail] = useState('');

  // Function to handle Email updates
  const handleEmailUpdate = async event => {
    // Perform validation and update logic here

    console.log("email")
    user.email = newEmail
    const response = await fetch('/api/users/' + userId, {
      method: "PATCH",
      body: JSON.stringify(user),
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
      console.log('email changed')
      console.log('new email: ' + user.email)
      fetchUserData();
    }

    setNewEmail(''); // Clear the input field
  };
  /////////////////////////////// Update Email Address End


  /////////////////////////////// Update Bio Start
  const [currentBio, setCurrentBio] = useState(bio);
  const [newBio, setNewBio] = useState('');

  // Function to handle Email updates
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
    const json = await response.json()

    // if (!response.ok) {
    //     setError(json.error)
    // }

    if (response.ok) {
      // setError(null)
      console.log('bio changed')
      console.log('new bio: ' + user.bio)
      fetchUserData();
    }

    setNewBio(''); // Clear the input field
  };
  /////////////////////////////// Update Bio End

  /////////////////////////////// Update Phone Number Start
  const [currentPhonenumber, setCurrentPhonenumber] = useState(phone);
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
    const json = await response.json()

    // if (!response.ok) {
    //     setError(json.error)
    // }

    if (response.ok) {
      // setError(null)
      console.log('phone changed')
      console.log('new phone: ' + user.phoneNumber)
      fetchUserData();
    }
    // Perform validation and update logic here
    //setCurrentPhonenumber(newPhonenumber);
    setNewPhonenumber(''); // Clear the input field
  };
  /////////////////////////////// Update Phone Number End


  ////////////////////////////// Update Profile Picture Start
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const defaultProfilePictureUrl = useState('optiroute/src/Components/Assets/logo.png');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setImageUrl(null)
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (selectedFile && selectedFile instanceof File) {
      // You can perform image upload logic here
      // For this example, we'll just simulate a delay and set the URL
      setTimeout(() => {
        setImageUrl(URL.createObjectURL(selectedFile));
      }, 1000);
    } else {
      alert("Please select an image first!");
    }
  };
  ////////////////////////////// Update Profile Picture End


  ////////////////////////////// Delete Profile (Ben) Start
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
    navigate("/login")  // Example: Redirecting user after deletion
  }
  ////////////////////////////// Delete Profile (Ben) End

  ////////////////////////////// RETURN
  // test new
  return (
    <>
      {invalidAccess ? null : (
        <div className='container'>
          <div className='header'>
            <div className='text'>Profile Settings</div>
            <div className='underline'></div>
          </div>
          <div className='submit-container'>
          <div className="submit" onClick={() => navigate("/calendar")}>To Calendar</div>
          <div className="submit" onClick={() => navigate("/find-friends")}>Find Friends</div>
          <div className="submit" onClick={() => navigate("/friend-requests")}>Friend Requests</div> 
          <div className="submit" onClick={() => navigate("/friend-list")}>Friend List</div> 
          </div>
          <div className='field-group'>
            <div className='inputs'>
              <h1>Current Username: {name}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                />
              </div>
              <div className="submit" onClick={handleUsernameUpdate}>Update Username</div>

              <h1>Current Email: {email}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new Email"
                />
              </div>
              <div className="submit" onClick={handleEmailUpdate}>Update Email</div>

              <h1>Current Phone Number: {phone}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newPhonenumber}
                  onChange={(e) => setNewPhonenumber(e.target.value)}
                  placeholder="Enter new phone number"
                />
              </div>
              <div className="submit" onClick={handlePhonenumberUpdate}>Update Phone Number</div>

              <h1>Current Bio: {bio}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Enter new bio"
                />
              </div>
              <div className="submit" onClick={handleBioUpdate}>Update Bio</div>
              <div className="delete" onClick={deleteProfile}>Delete Profile</div>
            </div>
          </div>
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
    </>
  )
}

export default UserProfile