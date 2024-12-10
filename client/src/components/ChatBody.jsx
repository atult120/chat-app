import React from 'react'
import {useNavigate} from "react-router-dom"

const ChatBody = ({messages, typingStatus, lastMessageRef}) => { 
  const navigate = useNavigate()
  const userName = localStorage.getItem("userName") || "Guest";

  

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }
  
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages?.map((message) => {
          const isSender = message.name === userName;
          return (
            <div className="message__chats" key={message.id || message.timestamp}>
              <p className={isSender ? "sender__name" : "recipient__name"}>
                {isSender ? "You" : message.name}
              </p>
              <div className={isSender ? "message__sender" : "message__recipient"}>
                <p>{message.text}</p>
              </div>
            </div>
          );
        })}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody