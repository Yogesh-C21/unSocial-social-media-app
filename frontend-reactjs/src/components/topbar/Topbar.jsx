import './topbar.css';
import { Search, Chat, Person, Notifications } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useAuth();
  const navigate = useNavigate();

  const homepageClickHandler = (event) => {
    navigate('/');
  }

  const chatClickHandler = () => {
    navigate('/messenger');
  }

  const profileOnClickHandler = () => {
    navigate('/profile');
  }

  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link to='/' style={{ textDecoration: "none" }}>
          <span className="logo">unSocial</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <Search className='searchIcon' />
          <input type="text" className="searchInput" placeholder='Search Friend, Post Or Video' />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topBarLinks">
          <span className="topBarLink" onClick={homepageClickHandler}>Homepage</span>
          <span className="topBarLink" >Timeline</span>
        </div>
        <div className="topBarIcon">
          <div className="topBarIconItem">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topBarIconItem" onClick={chatClickHandler}>
            <Chat />
            <span className="topBarIconBadge">4</span>
          </div>
          <div className="topBarIconItem">
            <Notifications />
            <span className="topBarIconBadge">3</span>
          </div>
        </div>
        <img
            src={user?.profilePicture ? PF + user.profilePicture : `${PF}noProfile.png`}
            alt="profile-pic-icon"
            className="topBarImg"
            onClick = {profileOnClickHandler} />
      </div>
    </div>
  );
}

export default Topbar;
