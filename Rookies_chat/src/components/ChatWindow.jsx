import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import api from '../services/api';

function ChatWindow({ chatRoomId }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/chat/messages/${chatRoomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    try {
      await api.post('/chat/send', { chatRoomId, content });
      setMessages([...messages, { content, timestamp: new Date() }]);
      setContent('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span>{msg.content}</span>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  chatRoomId: PropTypes.number.isRequired,
};

export default ChatWindow;
