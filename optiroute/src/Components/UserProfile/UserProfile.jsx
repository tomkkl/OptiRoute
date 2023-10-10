import UserInformation from "./UserInformation";

const UserProfile = () => {
    // Username
    const [newUsername, setNewUsername] = useState('');
    const [usernameChangeStatus, setUsernameChangeStatus] = useState(null);

    // Email Address
    const [newEmailAddress, setNewEmailAddress] = useState('');
    const [EmailAddressChangeStatus, setEmailAddressChangeStatus] = useState(null);

    // Bio
    const [newBio, setNewBio] = useState('');
    const [bioChangeStatus, setBioChangeStatus] = useState(null);

    // Phone Number
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [phoneNumberChangeStatus, setPhoneNumberChangeStatus] = useState(null);

    // Stil need something similar for picture

    // Function to handle username changes
  const handleUsernameChange = () => {
    setNewUsername(UserInformation.username);
    setUsernameChangeStatus('Username changed successfully')

  };

    // Function to handle email address changes
    const handleEmailAddressChange = () => {
       setNewEmailAddress(UserInformation.email);
       setEmailAddressChangeStatus('Email address changed successfully'); 
    };

    // Function to handle bio changes
    const handleBioChange = () => {
        setNewBio(UserInformation.bio);
        setBioChangeStatus('Bio changed successfully');
      };

    // Function to handle phone number changes
    const handlePhoneNumberChange = () => {
        setNewPhoneNumber(UserInformation.phone);
        setPhoneNumberChangeStatus('Phone number changed successfully');
      };









    return(
        <div>
            <h1>{UserInformation.name}</h1>
            <p>{UserInformation.username}</p>
            <p>{UserInformation.bio}</p>
            <p>{UserInformation.email}</p>
            <p>{UserInformation.phone}</p>
            // Still need profile picture


            <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={handleUsernameChange}>Change Username</button>


            <input
          type="text"
          placeholder="New email address"
          value={newEmailAddress}
          onChange={(e) => setNewEmailAddress(e.target.value)}
        />
        <button onClick={handleEmailAddressChange}>Change Email Address</button> 


        <input
          type="text"
          placeholder="New Bio"
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
        />
        <button onClick={handleBioChange}>Change Bio</button> 



        <input
          type='number'
          placeholder="New phone number"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
        <button onClick={handlePhoneNumberChange}>Change Phone Number</button> 
        </div>
    );


}