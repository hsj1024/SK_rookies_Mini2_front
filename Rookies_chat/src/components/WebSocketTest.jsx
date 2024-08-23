// src/components/WebSocketTest.jsx
import { useEffect } from 'react';

const WebSocketTest = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws'); // WebSocket URL

    socket.onopen = () => {
      console.log('WebSocket connected.');
      socket.send('Hello, WebSocket!');
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    socket.onclose = () => {
      console.log('WebSocket closed.');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Test Component</h2>
    </div>
  );
};

export default WebSocketTest;
