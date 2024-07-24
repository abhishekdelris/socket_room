
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
// const chatRoutes = require('./routes/chatRoutes');
const db = require('./src/config/db.js');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware 
app.use(bodyParser.json());
app.use('/api', userRoutes);
// app.use('/api', chatRoutes);



// Socket.io
io.on('connection', (socket) => {
  console.log(io.of("/socket").adapter);
  
  socket.on('joinRoom', ({ userId, room }) => {  
    
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room ${roomName}`);
  });


   socket.emit("playroom", (data) =>{
    console.log("message", data.message);
   })
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
