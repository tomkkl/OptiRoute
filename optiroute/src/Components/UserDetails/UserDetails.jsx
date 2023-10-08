const UserDetails = ({user}) => {
    return (
        <div className="user-details">
            <h4>{user.name}</h4>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Password: </strong>{user.password}</p>
            <p>{user.createdAt}</p>
        </div>
    )
}
export default UserDetails