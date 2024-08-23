// import { useState, useEffect } from 'react';

// function ChatPage() {
//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8080/ws/messages');
//     setSocket(ws);

//     ws.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (socket) {
//       socket.send(content);
//       setContent('');
//     }
//   };

//   return (
//     <div>
//       <h2>Chat Room</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <span>{msg}</span>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatPage;
import  { useState, useEffect } from 'react';
import {  Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/messages', (message) => {
        if (message.body) {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
        }
      });
    });

    setClient(stompClient);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [client]);

  const handleSendMessage = () => {
    if (client && content) {
      client.send('/app/chat.sendMessage', {}, JSON.stringify({ content }));
      setContent('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <span>{msg.content}</span>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
