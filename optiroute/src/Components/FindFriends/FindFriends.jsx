import React, { useState } from 'react';
import './FindFriends.css'

const FindFriends = () => {
  const [searchBy, setSearchBy] = useState('name'); // Stores the type of info 
  const [searchInput, setSearchInput] = useState(''); // Stores the value
  const [users, setUsers] = useState(''); // stores all the users

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const json = await response.json()

      if (response.ok) {
        setUsers(json)
      }
    }

    fetchUsers()
  }, [])

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform the action based on the selected search option and input
    console.log(`Searching by ${searchBy}: ${searchInput}`);

    // You may want to send the search criteria to your backend or perform some other action here
  };

  return (
    <div>
      <h2>Find Friends</h2>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search By:
          <select value={searchBy} onChange={handleSearchByChange}>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone number">Phone number</option>
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
    </div>
  );
};

export default FindFriends;