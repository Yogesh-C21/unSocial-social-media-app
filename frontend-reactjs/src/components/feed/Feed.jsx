import React, { useState, useEffect, useReducer } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios';
import useAuth from '../../context/useAuth';
// import {Posts} from '../../data';

function Feed({ home }) {

  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [updatePost, updatePostReducer] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const fetchPost = async () => {
      const resp = !home
        ? await axios.get('http://localhost:8080/api/posts/profile/' + user?.username)  // own posts
        : await axios.get('http://localhost:8080/api/posts/timeline/' + user._id); // all posts
      setPosts(
        resp.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }));
    }

    fetchPost();

  }, [home, user, updatePost]);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {home && <Share updatePost={updatePostReducer} />}
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed