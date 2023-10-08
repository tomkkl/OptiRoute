import "./Home.css";
import React, { useState } from 'react'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import phone_icon from '../Assets/phone.png'
import password_icon from '../Assets/password.png'
import { useNavigate } from 'react-router-dom';
import UserDetails from "../UserDetails/UserDetails";

const Home = () => {
    // Navigate to PW reset
  const navigate = useNavigate();
    //Change to work with Mongo
    //State does not work as well
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const responce = await fetch('/api/users')
      const json = await responce.json()

      if(responce.ok){
          setUsers(json)
      }
    }
    fetchUsers()
  }, [])

  const [action,setAction] = useState("Home");

  return (
    <div className='container'>
        <div className="home">
          <div className="users">
            {users && users.map((user) =>(
              <UserDetails key ={user._id} user = {user}/>
            ))}
          </div>
        </div>
    <div className='submit-container'>
        <div className={action ==="Home"?"submit":"submit gray"} onClick={()=>{navigate("/")}}>Sign Up Now!</div>
            </div>
    </div>
  )
}

export default Home;