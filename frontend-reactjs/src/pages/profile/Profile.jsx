import "./profile.css"
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import useAuth from "../../context/useAuth";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [user, setUser] = useState({});

  const { user } = useAuth();

  // const {username} = useParams();

  // fetching user details that we will gonna use in post's top
  /* useEffect(()=> {
    const fetchUser = async() => {
      const resp = await axios.get(`http://localhost:8080/api/users?username=${username}`);
      setUser(resp.data);
    }
    fetchUser();
  }, [username]); */

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PF + user.coverPicture : `${PF}noCover.png`} alt="cover-img" className="profileCoverImg" />
              <img src={user.profilePicture ? PF + user.profilePicture : `${PF}noProfile.png`} alt="user-img" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed home={false} />
            <Rightbar home={false} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile