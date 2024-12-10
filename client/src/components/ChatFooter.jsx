import { useState } from "react";

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState("");
    const handleSubmitMessage = (e) => {
        e.preventDefault();
        if(message.trim() && localStorage.getItem("userName")) {
            socket.emit('message' , {
               text : message,
               name : localStorage.getItem('userName'),
               id : `${socket.id}-${Date.now()}`,
               socketId : socket.id     
            });
        }
        setMessage("");
    }
    const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSubmitMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">Send</button>
      </form>
    </div>
  );
};

export default ChatFooter;
