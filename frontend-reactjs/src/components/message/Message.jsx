import './message.css'
import { format } from 'timeago.js';
import React from 'react'

function Message({ own, text }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={`${PF}person/1.jpeg`} alt="" className="messageImg" />
        <p className="messageText">
          {text.text}
        </p>
      </div>
      <div className="messageBottom">
        <p>{format(text.createdAt)}</p>
      </div>
    </div>
  )
}

export default Message