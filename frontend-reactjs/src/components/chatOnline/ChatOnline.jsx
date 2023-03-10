import './chatOnline.css'


import React from 'react'

function ChatOnline() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src={`${PF}person/1.jpeg`} alt="" className="chatOnlineImg" />
            </div>
            <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">
            Mikasa
        </span>
    </div>
  )
}

export default ChatOnline