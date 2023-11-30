import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactSession } from "react-client-session"

const FriendRequests = () => {
    // stores all the incoming friend requests that the user currently has
    const [friendRequestList, setFriendRequestList] = useState([])

    const [currentUser, setCurrentUser] = useState(null)


    // Id of current user
    const userId = ReactSession.get("user_id");

    // Get and Set Current User
    useEffect(() => {
        const fetchUser = async () => {
            const responce = await fetch('/api/users/' + userId)
            const json = await responce.json()
            if (responce.ok) {
                setCurrentUser(json)
                setFriendRequestList(json.friendRequestList)
                console.log("Successfully retrieved current user data")
                
                for(let i = 0; i < friendRequestList.length; i++) {
                    console.log(friendRequestList[i].name)
                }
            }
        }
        fetchUser()
    }, [])

    const acceptRequest = (user_id) => {
        // Logic to accept friend request
        console.log(`Accepted friend request with ID: ${user_id}`);
        // Here, you can perform actions like making an API call to accept the request
        // and update the UI accordingly (remove the request from the list)
        const updatedRequests = friendRequestList.filter(request => request._id !== user_id);
        setFriendRequestList(updatedRequests);
      };
    
      const rejectRequest = (user_id) => {
        // Logic to reject friend request
        console.log(`Rejected friend request with ID: ${user_id}`);
        // Here, you can perform actions like making an API call to reject the request
        // and update the UI accordingly (remove the request from the list)
        const updatedRequests = friendRequestList.filter(request => request._id !== user_id);
        setFriendRequestList(updatedRequests);
      };

    return (
        <div>
          <h1>Incoming Friend Requests</h1>
          <ul>
            {friendRequestList.map((request) => (
              <li key={request._id}>
                {/* {request.sender} */}
                <button onClick={() => acceptRequest(request._id)}>Accept</button>
                <button onClick={() => rejectRequest(request._id)}>Reject</button>
              </li>
            ))}
          </ul>
        </div>
      );




}


export default FriendRequests;