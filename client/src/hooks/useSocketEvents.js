import { useEffect, useState } from 'react';
import { socket } from '../context/socketContext';

const useSocketEvents = (onDraw, onClear) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('draw', onDraw);
    socket.on('clear', onClear);
    socket.on('updateUsers', (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off('draw', onDraw);
      socket.off('clear', onClear);
      socket.off('updateUsers');
    };
  }, [onDraw, onClear]);

  return { users };
};

export default useSocketEvents;
