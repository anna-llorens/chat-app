import useRecentChats from "@/hooks/chat/use-recent-chats";
import { useAuth } from "@/hooks/user/use-Auth";
import { User } from "@/interfaces";
import { useMediaQuery } from "@chakra-ui/react";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface ChatContextType {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedUser: User | null;
  setDetailsInfo: React.Dispatch<React.SetStateAction<User | null>>;
  detailsUser: User | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsUser, setDetailsInfo] = useState<User | null>(null);
  const authUser = useAuth();
  const { recentChats } = useRecentChats(authUser ? authUser.id : "");

  const [isSmallScreen] = useMediaQuery(["(max-width: 768px)"], { ssr: false });
  useEffect(() => {
    // Preselect a user only if it's not a small screen
    if (!isSmallScreen && !selectedUser && recentChats && recentChats.length > 0) {
      setSelectedUser(recentChats[0].user);
    }
  }, [recentChats, selectedUser, isSmallScreen, setSelectedUser]);
  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser, setDetailsInfo, detailsUser }}>
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

