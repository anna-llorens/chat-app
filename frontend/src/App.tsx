
import './App.css';
import ChatPage from './pages/chat/chat-page';
import LoginPage from './pages/login-page';
import { useAuth } from './context/auth-context';

function App() {
  const { user } = useAuth();

  return (
    <>
      {user ? <ChatPage /> : <LoginPage />}
    </>
  );
}

export default App;
