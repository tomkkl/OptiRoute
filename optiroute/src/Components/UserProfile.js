// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from an API or any data source
    // replace the line below with an API or a data source
    fetch('https://api.example.com/userdata')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data: ', error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
    </div>
  );
};

export default UserProfile;
