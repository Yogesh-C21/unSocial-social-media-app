import React, { useState, useEffect } from 'react'
import './post.css'
import { MoreVert } from '@mui/icons-material'
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';

export default function Post({ post }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useAuth();

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [post.likes, currentUser._id]);

    // fetching user details that we will gonna use in post's top
    useEffect(() => {
        const fetchUser = async () => {
            const resp = await axios.get(`http://localhost:8080/api/users/${post.userId}`);
            setUser(resp.data);
        }
        fetchUser();
    }, [post.userId]);

    const likeHandler = (event) => {
        try {
            axios.put(`http://localhost:8080/api/posts/${post._id}/like`, { userId: currentUser._id })
        } catch (error) {
            console.log(error);
        }
        setLike(!isLiked ? like + 1 : like - 1);
        setIsLiked(!isLiked);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : `${PF}noProfile.png`} alt="user-profile-pic" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username || 'User'}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={`${PF}${post.img}`} alt="post-pic" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}like.png`} alt="like" className="likeIcon" onClick={likeHandler} />
                        <img src={`${PF}heart.png`} alt="heart" className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.coment}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
