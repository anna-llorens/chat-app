import { createContext, useState, useContext, ReactNode } from "react";

interface ChatContextType {
  isDetailsVisible: boolean;
  setDetailsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isDetailsVisible, setDetailsVisible] = useState<boolean>(false);

  return (
    <ChatContext.Provider value={{ isDetailsVisible, setDetailsVisible }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
