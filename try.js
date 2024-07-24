const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./src/utils/messages");
// const db = require('./src/config/db.js');
require("dotenv").config();
const {
  userJoin, 
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./src/utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Playing game create room";
const bet = [20, 50, 100, 200, 500, 1000];
const bet_price = bet.map(result => {
  result.data;
})

let arr=[]  
let playingArray=[]  


// Run when client connects
io.on("connection", (socket) => {
  // console.log("user connected", socket);
  // console.log(io.of("/").adapter);
  socket.on("joinRoom", ({ tableAmount, userId, playerName }) => {    //user_id, room-id , room mack user 4 playername 
    //tableAmmount userId playerName 
    // const user = userJoin(socket.id, username, room); //table -.500
    // database --->  user player room (table) ---> user one to one player , player one to many room ---> room max 4 player or min 2 player tabhi room game start  

    // //bet select for price 50 100 
    // switch (tableAmmount) {
    //   case 20:
    //     socket.join(user.room);
        
    //     break;
    //   case 50:
    //     socket.join(user.room);
    //     break;
    //   case 100:
    //     socket.join(user.room);
    //     break;
    //   case 200:
    //     socket.join(user.room);
    //     break;
    //   case 500:
    //     socket.join(user.room);
    //     break;
    //   case 1000:
    //     socket.join(user.room);
    //     break;
    //   default:
    //     console.log("select any price for bet");
    //     break;
    // }
    console.log("this is a value", tableAmount, userId, playerName);

    const room = `room-${tableAmount}`; // Create a unique room name based on table amount
    const username = playerName;
    console.log("username",username);

    const roomUsers = getRoomUsers(room);
    console.log('roomUser' ,room);
    if (roomUsers.length >= 4) {
      socket.emit("errorOccurred", formatMessage(botName, "Room is full. Please choose another room."));
      return;
    }

    const user = userJoin(socket.id, username, room); 
     console.log("user", user);
    // socket.join(user.room);
   
    console.log(socket.join(user.room));

    // Welcome current user
    socket.emit("joinRoomSuccess", formatMessage(botName, "Welcome to join Room successfully"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  }); 

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
    io.to(user.room).emit("joinRoomSuccess", formatMessage(botName, "Welcome to join Room successfully"));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(     //balance to send and chage database to connect database  
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
