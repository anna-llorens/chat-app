
import './App.css';
import ChatPage from './pages/chat/chat-page';
import LoginPage from './pages/login-page';
import { useUser } from './context/user-context';

function App() {
  const { user } = useUser();

  return (
    <>
      {user ? <ChatPage /> : <LoginPage />}
    </>
  );
}

export default App;
