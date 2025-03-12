// client/src/App.js
import React, { useEffect, useRef, useState } from 'react';
import CanvasRenderer from './components/canvas/CanvasRenderer';
import Toolbar from './components/toolbar/Toolbar';
import Notification from './components/notifications/Notification';
import { connectSocket, disconnectSocket, emitDraw, emitClearCanvas, emitUndo } from './services/socketService';
import './styles/app.css';

const App = () => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    connectSocket();

    // ✅ Listen for user list update
    window.socket.on('user-list', (userList) => {
      setUsers(userList);
    });

    // ✅ Listen for notifications
    window.socket.on('notification', (message) => {
      setNotification(message);
      setTimeout(() => setNotification(''), 4000); // Show notification for 4 seconds
    });

    window.socket.on('draw', ({ x, y, color, brushSize }) => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    window.socket.on('clear', () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    });

    window.socket.on('undo', () => {
      // Optional: Handle undo (if implemented in socketService)
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleJoinRoom = () => {
    if (roomId && userName) {
      window.socket.emit('join-room', roomId, userName);
    }
  };

  const handleClear = () => {
    emitClearCanvas();
  };

  const handleUndo = () => {
    emitUndo();
  };

  return (
    <div className="App">
      <h1>🎨 Real-Time Collaborative Drawing App</h1>
      <div>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>

      <Toolbar
        handleClear={handleClear}
        handleUndo={handleUndo}
      />

      <Notification message={notification} />

      <CanvasRenderer canvasRef={canvasRef} />

      <div>
        <h3>Connected Users:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
