import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { Provider } from "@/components/ui/provider";
import { UserProvider } from './context/user-context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>,
)
