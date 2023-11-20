import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactSession } from "react-client-session"


const FindFriends = () => {
  const [user, setUser] = useState(null)
  const [friendRequestList, setFriendRequestList] = useState([])

  const [searchBy, setSearchBy] = useState('name'); // Stores the type of info 
  const [searchInput, setSearchInput] = useState(''); // Stores the value
  const [users, setUsers] = useState(null); // stores all the users

  // NOTE: Not the friends that the user currently has, just the ones that matched his search
  const [friends, setFriends] = useState([]); // contains all the friends that the user is looking for 
  
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
  
  const handleSendFriendRequest = async () => {
    // Logic to send friend request for selectedFriends array
    console.log('Sending friend request to:', selectedFriends);
    // Implement the logic to send friend requests to selected friends
    console.log(users)
    // get every user

    // Loop through selectedFriends using forEach
    selectedFriends.forEach(async (friendId) => {
      // Go through users and append current user to the friend's friend request list
      var response = await fetch('/api/users/' + friendId)

      
      var json = await response.json()
      if (response.ok) {
        setUser(json)
        setFriendRequestList(json.friendRequestList)
      }

      // Id of current user
      const userId = ReactSession.get("user_id"); // Convert to string explicitly    console.log(userId)
      // make a patch request adding current user to friend request list of that friend
      friendRequestList.push(userId)

      response = await fetch('/api/users/' + friendId, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      json = await response.json()

      if(response.ok) {
        console.log('Successfully added user to friend request list')
        console.log(user.friendRequestList)
      }

    });
  };

    // Function to handle username updates
  // const handleUsernameUpdate = async event => {

  //   console.log("name")
  //   user.name = newUsername
  //   const response = await fetch('/api/users/' + userId, {
  //     method: "PATCH",
  //     body: JSON.stringify(user),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const json = await response.json()

  //   // if (!response.ok) {
  //   //     setError(json.error)
  //   // }

  //   if (response.ok) {
  //     // setError(null)
  //     console.log('name changed')
  //     console.log('new name: ' + user.name)
  //     fetchUserData()
  //   }
  //   setNewUsername(''); // Clear the input field
  // };

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

  // TODO: Loop through users and
  // TODO: Fri req checkbox  
  console.log(friends)
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
        </div>
      )}
    </div>
  );
};

export default FindFriends;