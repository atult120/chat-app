import './App.css'
import Home from './components/Home'
import socketIO from "socket.io-client";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import ChatPage from './page/ChatPage';

const socket = socketIO("http://localhost:8080");
function App() {

  return (
    <BrowserRouter>
     <div>
        <Routes>
          <Route path="/" element={<Home socket={socket}/>} />
          <Route path="/chat" element={<ChatPage socket={socket}/>} />
        </Routes>
     </div>
    </BrowserRouter>
  )
}

export default App
