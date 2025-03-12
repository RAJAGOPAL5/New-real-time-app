const socketService = require("../services/socketService");

let connectedUsers = 0; // Track connected user count
const userMap = new Map(); // Map socket IDs to readable user names

module.exports = (io) => {
  io.on("connection", (socket) => {
    connectedUsers++;
    const username = `User-${connectedUsers}`;
    userMap.set(socket.id, username); // Assign readable user names
    console.log(`${username} connected`);

    // ✅ Notify all clients of new user connection
    io.emit("updateUsers", Array.from(userMap.values()));

    // ✅ Add user to socket service
    socketService.addUser(socket);

    socket.on("draw", (data) => {
      socketService.handleDraw(socket, data);
    });

    socket.on("clear", () => {
      socketService.handleClear(socket);
    });

    socket.on("disconnect", () => {
      console.log(`${userMap.get(socket.id)} disconnected`);
      userMap.delete(socket.id);

      // ✅ Notify all clients of user disconnection
      io.emit("updateUsers", Array.from(userMap.values()));

      connectedUsers--;
      socketService.removeUser(socket);
    });
  });
};
