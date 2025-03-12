// server/services/socketService.js
const users = {};

const addUser = (socket, userName, roomId) => {
  users[socket.id] = { userName, roomId };
};

const handleDraw = (socket, data) => {
  const { roomId } = users[socket.id];
  socket.broadcast.to(roomId).emit('draw', data);
};

const handleClear = (socket) => {
  const { roomId } = users[socket.id];
  socket.broadcast.to(roomId).emit('clear');
};

const handleUndo = (socket) => {
  const { roomId } = users[socket.id];
  socket.broadcast.to(roomId).emit('undo');
};

const removeUser = (socket) => {
  delete users[socket.id];
};

module.exports = { addUser, handleDraw, handleClear, handleUndo, removeUser };
