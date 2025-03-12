import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SocketProvider } from './context/socketContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
