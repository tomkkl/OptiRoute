import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import logo from '../Assets/logo.png'


const UserProfile = () => {
  // const [users, setUsers] = useState(null)
  
  const navigate = useNavigate()
  // {name, email, password, username, bio, phonenumber, image}
  // Need to update username, email address, profile picture

  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [bio, setBio] = useState('')
  // const [phonenumber, setPhonenumber] = useState('')
  // const [image, setImage] = useState('')

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
    setSelectedFile('optiroute/src/Components/Assets/logo.png')
  
  };

  

  const handleUpload = () => {
    if (selectedFile) {
      // You can perform image upload logic here
      // For this example, we'll just simulate a delay and set the URL
      setTimeout(() => {
        setImageUrl(URL.createObjectURL(selectedFile));
      }, 1000);
    }
  };



  ////////////////////////////// Update Profile Picture End


  // const handleChangeEmail = async event => {
  //   setEmail(event.target.value)
  // }
  // const handleChangeUsername = async event => {
  //   setUsername(event.target.value)
  // }
  // const handleChangeBio = async event => {
  //   setBio(event.target.value)
  // }
  // const handlePhonenumber = async event => {
  //   setPhonenumber(event.target.value)
  // }
  // const handleChangeImage = async event => {
  //   setImage(event.target.value)
  // }

  // const handleClick = async event => {
    
  //   var user = null

  //   user = {name, email, password, username, bio, phonenumber, image}

  //   const response = await fetch('/api/users', {
  //     method: "PATCH",
  //     body: JSON.stringify(user),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   const json = await response.json()

  //   if(response.ok) {
  //     setError(null)
  //     console.log('User Information has been updated', json)
  //   } else {
  //     setError(json.error)
  //   }


  // }













  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch('http://localhost:4000/api/users')
  //     const json = await response.json()
      
  //     if(response.ok) {
  //       setUsers(json)
  //     }

  //   }

  //   fetchUsers()
  // }, [])

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Profile Settings</div>
        <div className='underline'></div>
      </div>

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
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="submit" onClick={handleUpload}>Upload Image</div>

        <div className="submit" onClick={handleFileRemove}>Remove Image</div> 
        {imageUrl && (
          <div className='img'>
            <p>Profile Picture:</p>
            <img src={imageUrl} alt="Uploaded" />
          </div>
        )}



        
        
        
      </div>
    </div>
  )
}

export default UserProfile