import React, { useRef, useState } from 'react'
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import './share.css'
import useAuth from '../../context/useAuth';
import axios from 'axios';

function Share({ updatePost }) {
    const { user } = useAuth();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file, setFile] = useState(null);
    const description = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();

        const newPost = {
            userId: user._id,
            desc: description.current.value
        };

        if (file) {
            const data = new FormData();
            // const fileName = Date.now() + ;
            data.append('file', file);
            data.append('name', file.name);
            newPost.img = file.name;
            try {
                await axios.post('http://localhost:8080/api/upload', data);
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await axios.post("http://localhost:8080/api/posts", newPost);
        } catch (error) {
            console.log(error);
        }
        updatePost();
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : `${PF}noProfile.png`} alt="profile-pic" className="shareProfileImg" />
                    <input
                        type="text"
                        className="shareInput"
                        placeholder={"What's on your mind " + user.username + "?"}
                        ref={description}
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className="shareOptionText">Photo / Video</span>
                            <input style={{ display: 'none' }} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share