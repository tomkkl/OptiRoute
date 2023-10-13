import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  // const [users, setUsers] = useState(null)
  
  const navigate = useNavigate()
  // {name, email, password, username, bio, phonenumber, image}
  // Need to update username, email address, profile picture

  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [image, setImage] = useState('')

  const handleChangeEmail = async event => {
    setEmail(event.target.value)
  }











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
    <div className='container'>
      <div className='header'> 
      <
      </div>
    </div>
  )

  }


export default UserProfile