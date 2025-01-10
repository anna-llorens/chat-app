import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuth } from './hooks/user/use-Auth.tsx';
import ChatPage from './pages/chat/chat-page';
import LoginPage from './pages/login-page';

const queryClient = new QueryClient();
const App = () => useAuth()?.id ? <ChatPage /> : <LoginPage />;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
