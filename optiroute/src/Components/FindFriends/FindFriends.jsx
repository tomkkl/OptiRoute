import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactSession } from "react-client-session"
import { useNavigate } from 'react-router-dom';

var friendId;
const FindFriends = () => {
  // Id of current user
  const userId = ReactSession.get("user_id"); // Convert to string explicitly    console.log(userId)
  const [currentUser, setCurrentUser] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false)

  const [friendRequestList, setFriendRequestList] = useState([]) // the fri req list of that user

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
      

      // setUser(json);// problem is here probably
     
      if (response.ok && json) {
        console.log("This line has been ")
        setFriendRequestList(json.friendRequestList)
        console.log("executed")
        // user = json

        console.log("Successfully retrieved the info of: " + json.name)
        // console.log("Successfully retrieved the info of:2 " + user.name)
        
        console.log("Successfully retrieved the info of json: " + json.name)
        console.log("Successfully retrieved the info of local: " + user.name)
        setFriendRequestList(json.friendRequestList)
        console.log("fri req list before adding current user: " + json.friendRequestList)

      }
    };
  //   fetchUserData(friendId)
  // }, [user, friendId])
  const handleSendFriendRequest = async () => {
    setPopup(true);

    selectedFriends.forEach(async (friendId) => {
      try {
        // Fetch the user data of the friend
        const response = await fetch('/api/users/' + friendId);
        const json = await response.json();

        if (response.ok && json) {
          // Get the current friendRequestList of the friend
          const currentFriendRequestList = json.friendRequestList || [];

          // Check if the current user's ID is not already in the friend's friendRequestList
          if (!currentFriendRequestList.includes(userId)) {
            // Append the current user's ID to the friend's friendRequestList
            currentFriendRequestList.push(userId);

            // Make a PATCH request to update the friend's friendRequestList
            const patchResponse = await fetch(`/api/users/${friendId}`, {
              method: 'PATCH',
              body: JSON.stringify({ friendRequestList: currentFriendRequestList }),
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (patchResponse.ok) {
              console.log('Successfully added user to friend request list for friend ID:', friendId);
            } else {
              console.error('Failed to update friend request list for friend ID:', friendId);
            }
          } else {
            console.log(`User with ID ${userId} is already in the friend request list of friend ID ${friendId}`);
          }
        }
      } catch (error) {
        console.error('Error sending friend request:', error);
    // Logic to send friend request for selectedFriends array
    console.log('Sending friend request to:', selectedFriends);
    // Implement the logic to send friend requests to selected friends
    // console.lo g(users)
    // get every user

    // Loop through selectedFriends using forEach
    selectedFriends.forEach((friendId) => {
      // Go through users and append current user to the friend's friend request list
      // var response = await fetch('/api/users/' + friendId)
      // var json = await response.json()
      // if (response.ok) {
      //   console.log("Successfully retrieved the info of: " + json.name)
      //   // console.log(json.email)
      //   // console.log(json._id)
      //   // // set everything
      //   setUser(json)  
      //   setFriendRequestList(json.friendRequestList)
      // console.log("Req List: " + friendRequestList)

      // }

      fetchUserData(friendId);
      // make a patch request adding current user to friend request list of that friend
      // if the list contains current user already, then don't do anything but otherwise add current user
      if (!friendRequestList.includes(userId)) {
        friendRequestList.push(userId)
      }


      console.log("Fri req list after: " + friendRequestList)

      console.log("user: " + user) // user is null
      console.log("user fr req list " + user.friendRequestList)
      user.friendRequestList = friendRequestList; // this is null
      // console.log("User " + user)
      
      const response = fetch('/api/users/' + friendId, { //
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      if (response.ok) {
        console.log('Successfully added user to friend request list')
        console.log(user.friendRequestList)
      } else {
        throw new Error('Bad request');
      }
    });
  };



  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform the action based on the selected search option and input
    // console.log(`Searching by ${searchBy}: ${searchInput}`);

    // Send the search criteria to the backend or perform some other action here

    // Filter users based on the search criteria
    // Will include yourself if you fit the criteria as well
    
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

  // TODO: Loop through users and
  // TODO: Fri req checkbox  
  // console.log(friends)
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
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleFriendCheckboxChange(e, friend._id)}
                    checked={selectedFriends.includes(friend._id)}
                  />
                  {` Name: ${friend.name}`}
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
          <div className="button" onClick={() => { navigate("/friend-list") }}>See Friends</div>
        </div>
      )}
    </div>
  );
};

export default FindFriends;