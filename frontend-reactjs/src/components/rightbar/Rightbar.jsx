import React, { useEffect, useState } from 'react'
import './rightbar.css'
import { Users } from '../../data';
import Online from '../online/Online';
import axios from 'axios';
import useAuth from '../../context/useAuth';

function Rightbar({ home }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`http://localhost:8080/api/users/friends/${user._id}`);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFriends();
    }, [user]);

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Eren Yeager</b> and <b>Mikasa Anderson</b> Have Birthday Today </span>
                </div>
                <img src={`${PF}ad.png`} alt="ad-img" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((user) => (
                        <Online key={user.id} users={user} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitleInfo">{user.username}'s Info</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1 ? "Single"
                                : user.relationship === 2 ? "Married"
                                    : "Divorce"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitleFriends">My Friends</h4>
                <div className="rightbarFollowings">
                    {friends?.map((friend) => (
                        <div className="rightbarFollowing" key={friend._id}>
                            <img src={friend.profilePicture ? PF + friend.profilePicture : `${PF}noProfile.png`} alt="following-img" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">
                                {friend.username}
                            </span>
                        </div>
                    ))}
                </div>
            </>
        )
    }
    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                {home ? <HomeRightBar /> : <ProfileRightbar />}
            </div>
        </div>
    )
}

export default Rightbar