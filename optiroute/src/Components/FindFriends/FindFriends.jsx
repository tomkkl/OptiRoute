import React, { useState } from 'react';

const FindFriends = () => {
  const [searchBy, setSearchBy] = useState('name'); // Default search option is 'name'
  const [searchInput, setSearchInput] = useState('');

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
    // Send the search criteria to your backend or perform some other action here
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
            <option value="phoneNumber">Phone Number</option>
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