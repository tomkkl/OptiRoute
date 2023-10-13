import React, { useState, useRef} from 'react'
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

  // if (location.state && location.state.userId) {
  //   const userId = location.state && location.state.userId;
  //   console.log("USERPROFILE: " + userId);
  // }
  const userId = location.state?.userId;
  console.log("USERPROFILE: " + userId);  

  const fileInputRef = useRef(null);

  ///////////////////////////////// Update Username Start
  const [currentUsername, setCurrentUsername] = useState('JohnDoe');
  const [newUsername, setNewUsername] = useState('');

  // Function to handle username updates
  const handleUsernameUpdate = () => {
    // Perform validation and update logic here
    setCurrentUsername(newUsername);
    setNewUsername(''); // Clear the input field
  };
  ///////////////////////////////// Update Username End


  /////////////////////////////// Update Email Address Start
  const [currentEmail, setCurrentEmail] = useState('test@gmail.com');
  const [newEmail, setNewEmail] = useState('');

  // Function to handle Email updates
  const handleEmailUpdate = () => {
    // Perform validation and update logic here
    setCurrentEmail(newEmail);
    setNewEmail(''); // Clear the input field
  };
  /////////////////////////////// Update Email Address End


  /////////////////////////////// Update Bio Start
  const [currentBio, setCurrentBio] = useState('I am a student');
  const [newBio, setNewBio] = useState('');

  // Function to handle Email updates
  const handleBioUpdate = () => {
    // Perform validation and update logic here
    setCurrentBio(newBio);
    setNewBio(''); // Clear the input field
  };
  /////////////////////////////// Update Bio End


  /////////////////////////////// Update Phone Number Start
  const [currentPhonenumber, setCurrentPhonenumber] = useState('012345');
  const [newPhonenumber, setNewPhonenumber] = useState('');
  // Function to handle Email updates
  const handlePhonenumberUpdate = () => {
    // Perform validation and update logic here
    setCurrentPhonenumber(newPhonenumber);
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

  const executeProfileDelete = () => {
    
    navigate("/login")  // Example: Redirecting user after deletion
  }
  ////////////////////////////// Delete Profile (Ben) End

  ////////////////////////////// RETURN
  return (
    <>
      {invalidAccess ? null : (
        <div className='container'>
          <div className='header'>
            <div className='text'>Profile Settings</div>
            <div className='underline'></div>
          </div>
          <div className='field-group'>
            <div className='inputs'>
              <h1>Current Username: {currentUsername}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                />
              </div>
              <div className="submit" onClick={handleUsernameUpdate}>Update Username</div>

              <h1>Current Email: {currentEmail}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new Email"
                />
              </div>
              <div className="submit" onClick={handleEmailUpdate}>Update Email</div>

              <h1>Current Phone Number: {currentPhonenumber}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newPhonenumber}
                  onChange={(e) => setNewPhonenumber(e.target.value)}
                  placeholder="Enter new phone number"
                />
              </div>
              <div className="submit" onClick={handlePhonenumberUpdate}>Update Phone Number</div>


              <h1>Current Bio: {currentBio}</h1>
              <div className='input'>
                <input
                  type="text"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Enter new bio"
                />
              </div>
              <div className="submit" onClick={handleBioUpdate}>Update Bio</div>

              <div className='input'>
                <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
              </div>
              <div className="submit" onClick={handleUpload} disabled={!selectedFile}>Upload Image</div>
              <div className="submit" onClick={handleFileRemove}>Remove Image</div>
              {imageUrl && (
                <div className='img'>
                  <h3>Current Profile Picture:</h3>
                  <img src={imageUrl} alt="Uploaded" className='profile-picture' />
                </div>
              )}
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