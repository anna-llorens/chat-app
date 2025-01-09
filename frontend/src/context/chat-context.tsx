import { createContext, useState, useContext, ReactNode } from "react";
import { User } from "@/interfaces";
import useUsers from "@/hooks/use-users";

interface ChatContextType {
  isDetailsVisible: boolean;
  showUserDetails: (userId?: string) => void;
  selectedUser: User | null;
  setDetailsPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isDetailsVisible, setDetailsPanel] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { users } = useUsers();

  const showUserDetails = (userId?: string) => {
    const newUser = users?.find(user => user.id === userId);
    if (newUser) {
      setSelectedUser(newUser);
      setDetailsPanel(true);
    }
  }



  return (
    <ChatContext.Provider value={{ isDetailsVisible, showUserDetails, selectedUser, setDetailsPanel }}>
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
