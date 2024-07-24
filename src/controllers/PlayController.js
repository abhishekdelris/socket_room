// controllers/chatController.js

const PlayRoom = require('../models/PlayRoom.js');
const Player = require('../models/Player.js');

// Create a new play room
exports.createPlayRoom = async (req, res) => {
  const { name } = req.body;

  try {
    // Validate input (add more validation as needed)
    if (!name) {
      return res.status(400).json({ message: 'Name is required for the chat room.' });
    }

    // Create chat room in the database
    const roomData = { 
      name: name
      // Add more fields as needed
    };

    const roomId = await PlayRoom.createPlayRoom(roomData);

    res.status(201).json({ id: roomId, name: name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all chat rooms
exports.getAllPlayRooms = async (req, res) => {
  try {
    const playRooms = await PlayRoom.getAllPlayRooms;
    res.json(chatRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get chat room by ID
exports.getChatRoomById = async (req, res) => {
  const roomId = req.params.id;

  try {
    const chatRoom = await ChatRoom.getChatRoomById(roomId);
    res.json(chatRoom);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Create a new message in a chat room
exports.createMessage = async (req, res) => {
  const { room_id, user_id, content } = req.body;

  try {
    // Validate input (add more validation as needed)
    if (!room_id || !user_id || !content) {
      return res.status(400).json({ message: 'Room ID, user ID, and content are required for the message.' });
    }

    // Create message in the database
    const messageData = {
      room_id: room_id,
      user_id: user_id,
      content: content
      // Add more fields as needed
    };

    const messageId = await Message.createMessage(messageData);

    res.status(201).json({ id: messageId, room_id: room_id, user_id: user_id, content: content });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all messages in a chat room
exports.getMessagesByRoom = async (req, res) => {
  const roomId = req.params.id;

  try {
    const messages = await Message.getMessagesByRoom(roomId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
