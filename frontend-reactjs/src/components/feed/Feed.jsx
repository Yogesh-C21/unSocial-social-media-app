import React, { useState, useEffect } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios';
import useAuth from '../../context/useAuth';
// import {Posts} from '../../data';

function Feed({ username }) {

  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      const resp = username
        ? await axios.get('http://localhost:8080/api/posts/profile/' + username)  // own posts
        : await axios.get('http://localhost:8080/api/posts/timeline/' + user._id); // all posts
      setPosts(
        resp.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }));
    }

    fetchPost();

  }, [username, user._id]);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <Share />
        {posts && posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed