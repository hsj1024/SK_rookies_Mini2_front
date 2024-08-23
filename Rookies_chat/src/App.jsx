// import { Routes, Route, Link } from 'react-router-dom';
// import ChatPage from './pages/ChatPage';
// import './styles.css';

// function App() {
//   return (
//     <div>
//       <nav>
//         <Link to="/">Home</Link> | <Link to="/chat">Chat</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<h1>Welcome to the Chat Application</h1>} />
//         <Route path="/chat" element={<ChatPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
// src/App.jsx

import WebSocketTest from './components/WebSocketTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React WebSocket Example</h1>
        <WebSocketTest />
      </header>
    </div>
  );
}

export default App;
