import React, { useState, useRef } from 'react'
import { useEffect } from 'react'

const FindFriends = () => {
  const [searchBy, setSearchBy] = useState('name'); // Stores the type of info 
  const [searchInput, setSearchInput] = useState(''); // Stores the value
  const [users, setUsers] = useState(null); // stores all the users
  const [friends, setFriends] = useState(null); // contains all the friends that the user is looking for

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await fetch('/api/users');
          const json = await response.json();
  
          if (response.ok) {
            setUsers(json);
          } else {
            console.error('Error fetching users:', json);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
    fetchUsers()
  }, [])

  

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform the action based on the selected search option and input
    console.log(`Searching by ${searchBy}: ${searchInput}`);

    // Send the search criteria to the backend or perform some other action here

    // Filter users based on the search criteria
    const filteredUsers = users.filter((user) =>
      user[searchBy].toLowerCase().includes(searchInput.toLowerCase())
    );

    // Update the state with the filtered users
    setFriends(filteredUsers);
  };

  return (
    <div>
      <h2>Find Friends</h2>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search By:
          <select value={searchBy} onChange={handleSearchByChange}>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phoneNumber">Phone number</option>
          </select>
        </label>
        <br />
        <label>
          {`Enter ${searchBy}: `}
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>

      {users && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {friends.map((friend) => (
              <li key={friend._id}>
                {/* {`Name: ${friend.name}, Email: ${friend.email}, Phone: ${friend.phoneNumber}`} */}
                {`Name: ${friend.name}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindFriends;