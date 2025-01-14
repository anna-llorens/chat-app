import { api } from "@/api";
import { User } from "@/interfaces";
import { socket } from "@/socket";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface RecentChat {
  chatId: string;
  lastUpdated: string;
  user: User;
  lastMessage: string;
  notificationCount: number
}

const fetchRecentChats = async (userId: string): Promise<RecentChat[]> => {
  const response = await api.get(`/users/${userId}/recent-chats`);
  return response.data;
};

const useRecentChats = (userId: string) => {
  const { data: recentChats, isLoading, error, refetch } = useQuery<RecentChat[], any>({
    queryKey: ["recentChats", userId],
    queryFn: () => fetchRecentChats(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    const handleNewNotification = (contactId: string) => {
      if (contactId === userId) {
        refetch();
      }
    };
    socket?.on("newNotification", handleNewNotification);
    return () => {
      socket?.off("newNotification", handleNewNotification);
    };
  }, [socket]);

  return {
    isLoading,
    recentChats: recentChats || null,
    error: error?.response?.data?.message || null,
    refetchRecentChats: refetch,
  };
};

export default useRecentChats;
