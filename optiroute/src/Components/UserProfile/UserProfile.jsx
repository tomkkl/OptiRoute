import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  // const [users, setUsers] = useState(null)
  
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch('http://localhost:4000/api/users')
  //     const json = await response.json()
      
  //     if(response.ok) {
  //       setUsers(json)
  //     }

  //   }

  //   fetchUsers()
  // }, [])

  return(
    <div className='UserProfile'>
      <h3>Hello</h3>
    </div>
  )

  }


export default UserProfile