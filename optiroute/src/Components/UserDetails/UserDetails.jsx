const UserDetails = ({user}) => {
    return (
        <div className="user-details">
            <h4>{user.name}</h4>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
            <p><strong>Password: </strong>{user.password}</p>
            <p><strong>SEC Q: </strong>{user.securityQuestion}</p>
            <p>{user.createdAt}</p>
        </div>
    )
}
export default UserDetails