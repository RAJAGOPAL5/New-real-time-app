// server/index.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const socketService = require('./services/socketService');

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};
let userCount = 0; // To keep track of user numbers

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // ✅ Handle user joining a room
  socket.on('join-room', (roomId, userName) => {
    if (!userName) userName = `Anonymous-${++userCount}`;

    socket.join(roomId);
    users[socket.id] = { userName, roomId };

    console.log(`${userName} joined room ${roomId}`);

    // ✅ Notify all clients in the room about the new user
    io.to(roomId).emit('notification', `${userName} joined the room`);
    io.to(roomId).emit('user-list', getUsersInRoom(roomId));

    // ✅ Handle drawing event
    socket.on('draw', (data) => {
      io.to(roomId).emit('draw', data);
    });

    // ✅ Handle undo event
    socket.on('undo', () => {
      io.to(roomId).emit('undo');
    });

    // ✅ Handle clear canvas event
    socket.on('clear', () => {
      io.to(roomId).emit('clear');
    });

    // ✅ Handle disconnection
    socket.on('disconnect', () => {
      const { userName } = users[socket.id] || {};
      console.log(`${userName} disconnected`);

      // ✅ Notify other users after 4 seconds (for better UX)
      setTimeout(() => {
        delete users[socket.id];
        io.to(roomId).emit('notification', `${userName} left the room`);
        io.to(roomId).emit('user-list', getUsersInRoom(roomId));
      }, 4000);
    });
  });
});

// ✅ Get all connected users in a room
const getUsersInRoom = (roomId) => {
  return Object.values(users)
    .filter((user) => user.roomId === roomId)
    .map((user) => user.userName);
};

server.listen(5000, () => {
  console.log('🔥 Server running on http://localhost:5000');
});
