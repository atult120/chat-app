import { useEffect, useRef, useState } from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import { use } from "react";

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);
    const [typingStatus, setTypingStatus] = useState('');
    useEffect(() => {
        const handleMessageResponse = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        // Attach the socket listener
        socket.on('messageResponse', handleMessageResponse);

        // Cleanup the listener to avoid duplicates
        return () => {
            socket.off('messageResponse', handleMessageResponse);
        };
    } , [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => {
        console.log("inside typing response");
        console.log(data);
        setTypingStatus(data);
    });
  }, [socket]);
  return (
     <div className="chat">
         <ChatBar socket={socket} />
         <div className="chat__main">
            <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
            <ChatFooter socket={socket} />
         </div>
     </div>
  );
};

export default ChatPage;
