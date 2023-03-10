import './topbar.css';
import { Search, Chat, Person, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useAuth();
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
          <span className="topBarLink">Homepage</span>
          <span className="topBarLink">Timeline</span>
        </div>
        <div className="topBarIcon">
          <div className="topBarIconItem">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topBarIconItem">
            <Chat />
            <span className="topBarIconBadge">4</span>
          </div>
          <div className="topBarIconItem">
            <Notifications />
            <span className="topBarIconBadge">3</span>
          </div>
        </div>
        <Link to={user ? `profile/${user.username}` : "#"}>
          <img
            src={`${PF}noProfile.png`}
            alt="profile-pic-icon"
            className="topBarImg" />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
