import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactSession } from "react-client-session"
import './FindFriends.css';
import Sidebar from '../Sidebar/Sidebar';

const FindFriends = () => {
  // Id of current user
  const userId = ReactSession.get("user_id");
  const [currentUser, setCurrentUser] = useState(null)
  const [popup, setPopup] = useState(false)
  var friendRequestList = [];
  const [searchBy, setSearchBy] = useState('name'); // Stores the type of info 
  const [searchInput, setSearchInput] = useState(''); // Stores the value
  const [users, setUsers] = useState(null); // stores all the users

  // NOTE: Not the friends that the user currently has, just the ones that matched his search
  const [friends, setFriends] = useState([]); // contains all the friends that the user is looking for

  // Get and Set Current User
  useEffect(() => {
    const fetchUser = async () => {
      const responce = await fetch('/api/users/' + userId)
      const json = await responce.json()
      if (responce.ok) {
        setCurrentUser(json)
        console.log("Successfully retrieved current user data")
      }
    }
    fetchUser()
  }, [])

  // the list of friends that the user has chosen to send friend requests to
  const [selectedFriends, setSelectedFriends] = useState([]);
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

  const closePopup = () => {
    setPopup(false); // close the popup
  }

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFriendCheckboxChange = (event, friendId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      const updatedSelectedFriends = selectedFriends.filter(
        (id) => id !== friendId
      );
      setSelectedFriends(updatedSelectedFriends);
    }
  };
  // useEffect(() => {
  const fetchUserData = async (friendId) => {

    const response = await fetch('/api/users/' + friendId);
    const json = await response.json();

    if (response.ok && json) {
      console.log("This line has been ")
      console.log("executed")
      console.log("Successfully retrieved the info of: " + json.name)
      console.log("fri req list before adding current user: " + json.friendRequestList)
      friendRequestList = json.friendRequestList
      console.log("Local list is: " + friendRequestList)
    }
  };

  const handleSendFriendRequest = async () => {
    setPopup(true);
    console.log('Sending friend request to:', selectedFriends);

    for (const friendId of selectedFriends) {
      console.log("Friend ID: " + friendId);

      try {
        const userData = await fetchUserData(friendId);

        console.log("UserData:", userData);

        if (!friendRequestList.includes(userId)) {
          friendRequestList.push(userId);
          console.log("After pushing current user: " + friendRequestList)

          const response = await fetch('/api/users/' + friendId, {
            method: "PATCH",
            body: JSON.stringify({ friendRequestList: friendRequestList }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            console.log('Successfully added user to friend request list');
          } else {
            console.log("Bad Request");
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    var filteredUsers = users.filter((user) =>
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
  };

  return (
    <>
      <Sidebar />
      <div className="FEF-page-container">
        <div className="friend-list-sidebar">
          <h2>Find Friends</h2>
          <form className="form-modern" onSubmit={handleSearchSubmit}>
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
            <button className="submit">Search</button>
          </form>
        </div>

        {users && (
          <div className="friend-list-sidebar">
            <h3>Search Results:</h3>
            <ul>
              {friends.map((friend) => (
                <li key={friend._id} className="curr-friend-list">
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => handleFriendCheckboxChange(e, friend._id)}
                      checked={selectedFriends.includes(friend._id)}
                    />
                    <span className="curr-friend-list-item">Username: {friend.name}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleSendFriendRequest}>Send Friend Request</button>
            {popup && (
              <div className="popup">
                <div className="popup-content">
                  <span onClick={closePopup} className="close-btn">
                    &times;
                  </span>
                  <h2>Friend Request Sent!</h2>

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FindFriends;