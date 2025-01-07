import { useState, useEffect } from 'react';
import './App.css';
import ChatPage from './pages/chat-page';
import LoginPage from './pages/login-page';

function App() {
  const [userID, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUserID = localStorage.getItem('chat-app::userId');
    setUserId(storedUserID || undefined);
  }, []);

  return (
    <>
      {!userID ? <LoginPage setUserId={setUserId} /> : <ChatPage />}
    </>
  );
}

export default App;
