import { socket } from "@/socket";
import { useState, useEffect } from "react";


type UseOnlineStatusReturnType = {
  onlineUsers: string[];
};

const useOnlineStatus = (): UseOnlineStatusReturnType => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket?.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });
    socket?.on("userOnline", (userId: string) => {
      setOnlineUsers((prev) => {
        if (!prev.includes(userId)) {
          return [...prev, userId];
        }
        return prev;
      });
    });
    socket?.on("userOffline", (userId: string) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });
    return () => {
      socket?.off("onlineUsers");
      socket?.off("userOnline");
      socket?.off("userOffline");
    };
  }, []);

  return { onlineUsers };
};

export default useOnlineStatus;
