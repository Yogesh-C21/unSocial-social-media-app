import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../../context/useAuth';
import './conversation.css'

function Conversation({ conversation }) {

    const { user: currentUser } = useAuth();
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find(memberId => memberId !== currentUser._id);
        async function getUser() {
            try {
                const res = await axios.get('http://localhost:8080/api/users?userId=' + friendId);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [currentUser, conversation.members]);

    return (
        <div className='conversation'>
            <img
                src={user && user.profilePicture ? PF + user.profilePicture : `${PF}noProfile.png`}
                alt="profile-pic"
                className="conversationImg" />
            <span className="conversationName">{user ? user.username : 'Anonymous'}</span>
        </div>
    )
}

export default Conversation