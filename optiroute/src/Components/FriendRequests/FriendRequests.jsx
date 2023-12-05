import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactSession } from "react-client-session"
import './FriendRequests.css'; // Import CSS file

const FriendRequests = () => {
    // stores all the incoming friend requests (ids) that the user currently has
    const [friendRequestList, setFriendRequestList] = useState([])
    // stores the current user
    const [currentUser, setCurrentUser] = useState(null)
    // stores the friends that the user has
    const [friendList, setFriendList] = useState([])
    const [userNames, setUserNames] = useState([]);
    const [names, setNames] = useState([]);
    const [handledRequests, setHandledRequests] = useState([]);


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
                // console.log("Current user id: " + json._id)
                // console.log("Current user name: " + json.name)
            }
        }
        fetchUser()
    }, [userId, setCurrentUser])


    useEffect(() => {
        if (currentUser) {
            console.log("Current user id: " + currentUser._id);
            console.log("Current user name: " + currentUser.name);
            // Other actions based on updated currentUser
            console.log("friend req list" + friendRequestList.length)
            console.log("Name of fri req: " + friendRequestList)
            
        }
    }, [currentUser]);

    // Loop through the db and get all the names of the requests 
    // Fetch user data for each ID in friendRequestList and extract names
    // useEffect(() => {
    //     const fetchUserNames = async () => {
    //         // var names = []; /// made names global
    //         // names = friendRequestList; // not sure must initialize with names instead of id
            
    //         // add all the names to the name
    //         // for(let i = 0; i < friendRequestList.length; i++) {
    //         //   names.push(friendRequestList[i].name)
    //         // }

    //         console.log('names before: ' + names)
    //         for (let i = 0; i < friendRequestList.length; i++) {
    //             try {
    //                 const response = await fetch('/api/users/' + friendRequestList[i]);
    //                 const json = await response.json();
    //                 if (response.ok && json && json.name) {
    //                   // make a check to see if "names" alrdy has the json.name then no need to add
    //                   // make sure you print names instead
    //                   if (!names.includes(json.name)) {
    //                     names.push(json.name)
    //                   } 

    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching user data:", error);
    //             }
    //         }
    //         console.log("names after: " + names)
    //         setUserNames(names); // Set the array of user names
    //     };

    //     fetchUserNames();
    // }, [friendRequestList, names]);

    // Populate user names before rendering the component
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
          setUserNames(fetchedUserNames); // Set the array of user names after fetching
      };

      fetchUserNames();
  }, [friendRequestList]); // Trigger fetch when friendRequestList changes



    const rejectRequest = async (user_id) => {
        try {
          console.log(`Rejected friend request with ID: ${user_id}`);
          
          // Remove the friend from the friend request list
          const updatedRequests = friendRequestList.filter(request => request !== user_id); // check again
          setFriendRequestList(updatedRequests);
      
          // Make a PATCH request to update changes in the backend
          const response = await fetch(`/api/users/${userId}`, {
            method: "PATCH",
            body: JSON.stringify({ friendRequestList: updatedRequests }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const json = await response.json();
            console.log('Successfully rejected friend request');
            console.log("Updated friend request list of user:", json.friendRequestList);
            // Update the UI or perform other actions as needed
          } else {
            console.error('Failed to update friend request list in the backend');
            // Handle error scenarios or show error messages to the user
          }
          // Remove the user name from the userNames array
          const updatedUserNames = userNames.filter((_, index) => index !== friendRequestList.indexOf(user_id));
          setUserNames(updatedUserNames);
        } catch (error) {
          console.error('Error rejecting friend request:', error);
          // Handle errors such as network issues, etc.
        }
      };



    const acceptRequest = async (user_id) => {
        try {
          console.log(`Accepted friend request with ID: ${user_id}`);
          
          // Remove the friend from the friend request list
          const updatedRequests = friendRequestList.filter(request => request !== user_id); // check again
          setFriendRequestList(updatedRequests); // might need to change
          console.log("Updated Requests after remove: " + updatedRequests)
          
      
          // Check if the user_id is already in the friendList
          if (!friendList.includes(user_id)) {
            // Add the friend to the friend list if not already present
            const updatedFriendList = [...friendList, user_id];
            setFriendList(updatedFriendList);
      
            // Make a PATCH request to update changes in the backend
            const response = await fetch(`/api/users/${userId}`, {
              method: "PATCH",
              body: JSON.stringify({ 
                friendRequestList: updatedRequests,
                friendList: updatedFriendList
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
            if (response.ok) {
              const json = await response.json();
              console.log('Successfully accepted friend request');
              console.log("Updated friend request list of user:", json.friendRequestList);
              console.log("Updated friend list of user:", json.friendList);
              // Update the UI or perform other actions as needed
            } else {
              console.error('Failed to update friend request or friend list in the backend');
              // Handle error scenarios or show error messages to the user
            }
          } else {
            console.log(`User with ID: ${user_id} is already in the friend list`);
          }
          // Remove the user name from the userNames array
          const updatedUserNames = userNames.filter((_, index) => index !== friendRequestList.indexOf(user_id));
          setUserNames(updatedUserNames);
        } catch (error) {
          console.error('Error accepting friend request:', error);
          // Handle errors such as network issues, etc.
        }
      };

      return (
        <div>
            <h1>Incoming Friend Requests</h1>
            <ul>
                {userNames.map((userName, index) => (
                    <li key={index}>
                        {userName}
                        <button onClick={() => acceptRequest(friendRequestList[index])}>
                            Accept
                        </button>
                        <button onClick={() => rejectRequest(friendRequestList[index])}>
                            Reject
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRequests;