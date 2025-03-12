const users = {};

const addUser = (socket, userName, roomId) => {
  users[socket.id] = { userName, roomId };
  console.log(`${userName} connected to room ${roomId}`);
};

const handleDraw = (socket, data) => {
  const { roomId } = users[socket.id] || {};
  if (roomId) {
    socket.broadcast.to(roomId).emit("draw", data);
  }
};

const handleUndo = (socket) => {
  const { roomId } = users[socket.id] || {};
  if (roomId) {
    socket.broadcast.to(roomId).emit("undo");
  }
};

const handleClear = (socket) => {
  const { roomId } = users[socket.id] || {};
  if (roomId) {
    socket.broadcast.to(roomId).emit("clear");
  }
};

const removeUser = (socket) => {
  const { userName, roomId } = users[socket.id] || {};
  if (roomId) {
    console.log(`${userName} disconnected from room ${roomId}`);
    delete users[socket.id];
  }
};

module.exports = {
  addUser,
  handleDraw,
  handleUndo,
  handleClear,
  removeUser,
};
