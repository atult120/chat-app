const dotenv = require('dotenv');
dotenv.config();
const app = require('express')();
const http  = require('http').createServer(app);
const cors = require('cors');


const PORT = process.env.PORT || 8080;
app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:5173"
  }
});
function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(result);
  return result;
}

randomString();
let users = [];
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    console.log(`🔔: ${socket.id} user sent a message: ${data}`);
    socketIO.emit('messageResponse', data);
  });

  socket.on('newUser' , (data) => {
    console.log(`👋: ${socket.id} user just joined the chat!`);
      users.push(data);
      console.log(users);
      socketIO.emit('newUserResponse', users);
  });

  socket.on('typing' , (data) => {
      socketIO.emit('typingResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});


http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

