import React from 'react';

const Notification = ({ message }) => {
  if (!message) return null;
  return <div>{message}</div>;
};

export default Notification;
