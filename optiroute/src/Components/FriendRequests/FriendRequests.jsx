import React, { useState, useEffect } from 'react';
import { ReactSession } from "react-client-session";
import './FriendRequests.css'; // Import the updated CSS file
import Sidebar from '../Sidebar/Sidebar';

const FriendRequests = () => {
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userNames, setUserNames] = useState([]);
  const [friendList, setFriendList] = useState([]); // Added state for friendList
  const userId = ReactSession.get("user_id");

  const acceptRequest = async (user_id) => {
    try {
      console.log(`Accepted friend request with ID: ${user_id}`);

      const updatedRequests = friendRequestList.filter(request => request !== user_id);
      setFriendRequestList(updatedRequests);

      const updatedFriendList = [...friendList, user_id];
      setFriendList(updatedFriendList);

      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ friendRequestList: updatedRequests, friendList: updatedFriendList }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        console.log('Successfully accepted friend request');
      } else {
        console.error('Failed to update friend request or friend list in the backend');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/users/' + userId);
      const json = await response.json();
      if (response.ok) {
        setCurrentUser(json);
        setFriendList(json.friendList);
        setFriendRequestList(json.friendRequestList);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // UseEffect to fetch user data on component mount and set an interval for polling
  useEffect(() => {
    fetchUser();

    const interval = setInterval(() => {
      fetchUser(); // Fetch user data periodically
    }, 30000); // Poll every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [userId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const fetchedUserNames = [];
      for (let i = 0; i < friendRequestList.length; i++) {
        try {
          const response = await fetch('/api/users/' + friendRequestList[i]);
          const json = await response.json();
          if (response.ok && json && json.name) {
            if (!fetchedUserNames.includes(json.name)) {
              fetchedUserNames.push(json.name);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setUserNames(fetchedUserNames);
    };

    fetchUserNames();
  }, [friendRequestList]);

  const handleRequest = async (user_id, action) => {
    try {
      if (action === 'accepted') {
        await acceptRequest(user_id);
      }
      else {
        // Update friendRequestList
        const updatedRequests = friendRequestList.filter(request => request !== user_id);
        setFriendRequestList(updatedRequests);

        // Send update to the backend
        const response = await fetch(`/api/users/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({ friendRequestList: updatedRequests }),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to update friend request list in the backend');
        }

        // Update the UI
        const updatedUserNames = userNames.filter((_, index) => index !== friendRequestList.indexOf(user_id));
        setUserNames(updatedUserNames);

        console.log(`Successfully ${action} friend request with ID: ${user_id}`);
      }
    } catch (error) {
      console.error(`Error ${action} friend request:`, error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="FEF-page-container">
        <div className="form-modern">
          <h1>Incoming Friend Requests</h1>
          <ul>
            {userNames.map((userName, index) => (
              <li key={index} className="curr-friend-list">
                <span className="name-item">Username: {userName}</span>
                <button onClick={() => handleRequest(friendRequestList[index], 'accepted')} className="submit">
                  Accept
                </button>
                <button onClick={() => handleRequest(friendRequestList[index], 'rejected')} className="submit reject">
                  Reject
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FriendRequests;
