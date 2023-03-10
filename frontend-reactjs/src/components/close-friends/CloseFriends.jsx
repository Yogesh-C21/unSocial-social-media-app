import React from 'react'
import './closeFriends.css';

function CloseFriends({users}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (  
    <li className="sidebarFriend">
        <img src={PF + users.profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{users.username}</span>
    </li>
  )
}

export default CloseFriends