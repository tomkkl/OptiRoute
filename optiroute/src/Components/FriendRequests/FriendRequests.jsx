import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactSession } from "react-client-session"

const FriendRequests = () => {
    // stores all the incoming friend requests that the user currently has
    const [friendRequestList, setFriendRequestList] = useState([])
    // stores the current user
    const [currentUser, setCurrentUser] = useState(null)
    // stores the friends that the user has
    const [friendList, setFriendList] = useState([])

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
                setFriendList(json.friendList)
                console.log("Successfully retrieved current user data")

                for (let i = 0; i < friendRequestList.length; i++) {
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

        var indexToRemove = -1;
        // remove the friend from the friend request list 
        for (let i = 0; i < friendRequestList; i++) {
            if (friendRequestList[i]._id === user_id) {
                indexToRemove = i;
            }
        }
        if (indexToRemove >= 0 && indexToRemove < friendRequestList.length) {
            friendRequestList.splice(indexToRemove, 1); // Removes 1 element at the specified index
        }

        // Add the friend to the friend list
        friendList.push(user_id)

        // Make a patch request and update changes in the backend
        var response = fetch('/api/users/' + userId)
        var json = response.json()

        if(response.ok) {
            console.log("Successfully retrieved user data2")
            setCurrentUser(json)
            setFriendRequestList(json.friendRequestList)
            setFriendList(json.friendList)
        }


        response = fetch('/api/users/' + userId, {
            method: "PATCH",
            body: JSON.stringify(currentUser),
            headers: {
              'Content-Type': 'application/json'
            }
          })
    
          json = response.json()
    
          if(response.ok) {
            console.log('Successfully accepted friend request')
            console.log("Friend req list of user" + currentUser.friendRequestList)
            console.log("Friend list of user" + currentUser.friendList)
          }

        // Update the UI by removing the user from the request list
        const updatedRequests = friendRequestList.filter(request => request._id !== user_id);
        setFriendRequestList(updatedRequests);
    };

    const rejectRequest = (user_id) => {
        // Logic to reject friend request
        console.log(`Rejected friend request with ID: ${user_id}`);
        // Here, you can perform actions like making an API call to reject the request
        // and update the UI accordingly (remove the request from the list)
        
        var indexToRemove = -1;
        // remove the friend from the friend request list 
        for (let i = 0; i < friendRequestList; i++) {
            if (friendRequestList[i]._id === user_id) {
                indexToRemove = i;
            }
        }

        if (indexToRemove >= 0 && indexToRemove < friendRequestList.length) {
            friendRequestList.splice(indexToRemove, 1); // Removes 1 element at the specified index
        }

        // Make a patch request and update changes in the backend
        var response = fetch('/api/users/' + userId)
        var json = response.json()

        if(response.ok) {
            console.log("Successfully retrieved user data2")
            setCurrentUser(json)
            setFriendRequestList(json.friendRequestList)
            setFriendList(json.friendList)
        }


        response = fetch('/api/users/' + userId, {
            method: "PATCH",
            body: JSON.stringify(currentUser),
            headers: {
              'Content-Type': 'application/json'
            }
          })
    
          json = response.json()
    
          if(response.ok) {
            console.log('Successfully accepted friend request')
            console.log("Friend req list of user" + currentUser.friendRequestList)
            console.log("Friend list of user" + currentUser.friendList)
          }

        const updatedRequests = friendRequestList.filter(request => request._id !== user_id);
        setFriendRequestList(updatedRequests);
    };

    return (
        <div>
            <h1>Incoming Friend Requests</h1>
            <ul>
                {friendRequestList.map((request) => (
                    <li key={request._id}>
                        {request.name}
                        
                        <button onClick={() => acceptRequest(request._id)}>Accept</button>
                        <button onClick={() => rejectRequest(request._id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );




}


export default FriendRequests;