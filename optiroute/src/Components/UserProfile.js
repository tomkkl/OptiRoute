// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch user data from an API or any data source
    
    fetch('data source')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data: ', error));
  }, []);
  
  // Change profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Delete profile picture
  const handleDeletePicture = () => {
    setSelectedFile(null); // Reset the selected file to clear the current profile picture
  };
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <img src={userData.avatar} alt="User Avatar" />
      <h2>{userData.name}</h2>
      <p>Email: {userData.email}</p>
      <p>Bio: {userData.bio}</p>
      <div>
        <h3>Change Profile Picture</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected Profile Picture"
            style={{ maxWidth: '200px' }}
          />
        )}
      </div>
      {/* Add more user information as needed */}
    </div>
    

  );
};

export default UserProfile;
