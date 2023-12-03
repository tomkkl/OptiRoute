import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactSession } from "react-client-session"
import './FindExistingFriends.css';

var friendId;
const FindExistingFriends = () => {
  // Id of current user
  const userId = ReactSession.get("user_id"); // Convert to string explicitly    console.log(userId)
  const [currentUser, setCurrentUser] = useState(null)
  const [searchBy, setSearchBy] = useState('name'); // Stores the type of info 
  const [searchInput, setSearchInput] = useState(''); // Stores the value

  // NOTE: Not the friends that the user currently has, just the ones that matched his search
  const [friends, setFriends] = useState([]); // contains all the friends that the user is looking for

  const [currFriends, setCurrFriends] = useState([]); // contains all the friends that the user is looking for
  // Get and Set Current User


  const fetchUsers = async (currentUserNow) => {
    try {
      const response = await fetch('/api/users');
      const json = await response.json();
      if (response.ok) {
        console.log(currentUserNow)
        console.log(json)
        const currFriends = json.filter(user => currentUserNow.friendList.includes(user._id));
        console.log(currFriends)
        setCurrFriends(currFriends);

      } else {
        console.error('Error fetching users:', json);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }

  }
  useEffect(() => {
    const fetchUser = async () => {
      const responce = await fetch('/api/users/' + userId)
      const json = await responce.json()
      if (responce.ok) {
        setCurrentUser(json)
        console.log("Successfully retrieved current user data")
      }
      fetchUsers(json);
    }
    fetchUser()
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
    // console.log(`Searching by ${searchBy}: ${searchInput}`);

    // Send the search criteria to the backend or perform some other action here

    // Filter users based on the search criteria
    // Will include yourself if you fit the criteria as well



    var filteredUsers = currFriends.filter((user) =>
      user[searchBy].toLowerCase().includes(searchInput.toLowerCase())
    );

    console.log("Current user id: " + currentUser._id)
    console.log("Current user name: " + currentUser.name)


    var indexToRemove = -1;
    for (let i = 0; i < filteredUsers.length; i++) {
      console.log('hello: ' + filteredUsers[i]._id)
      if (filteredUsers[i]._id === currentUser._id) {
        indexToRemove = i;
      }
    }
    if (indexToRemove >= 0 && indexToRemove < filteredUsers.length) {
      filteredUsers.splice(indexToRemove, 1); // Removes 1 element at the specified index
    }
    // Update the state with the filtered users
    setFriends(filteredUsers);
    console.log("Frineds")
    console.log(friends)

  };
  // TODO: Loop through users and
  // TODO: Fri req checkbox  
  // console.log(friends)
  return (
    <div className="FEF-page-container">
      <div className="friend-list-sidebar">
        <h2>Friend List</h2>
        {currFriends.map((friend, index) => (
          <li key={index} className="curr-friend-list">
            <span className="curr-friend-list-item">Username: {friend.name}</span>
            <span className="curr-friend-list-item">Email: {friend.email}</span>
            <span className="curr-friend-list-item">Phone: {friend.phone}</span>
          </li>
        ))}
      </div>
      <h2>Find Friends</h2>
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="searchBy" className="search-label">
          Search By:
          <select
            id="searchBy"
            className="search-select"
            value={searchBy}
            onChange={handleSearchByChange}
          >
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

      {friends && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {friends.map((friend, index) => (
              <li key={index} className="curr-friend-list">
                <span className="curr-friend-list-item">Username: {friend.name}</span>
                <span className="curr-friend-list-item">Email: {friend.email}</span>
                <span className="curr-friend-list-item">Phone: {friend.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindExistingFriends;