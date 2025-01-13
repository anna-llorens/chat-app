import { api } from "@/api";
import { User } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

interface RecentChat {
  chatId: string;
  lastMessage: string;
  user: User;
  createdAt: string;
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

  return {
    isLoading,
    recentChats: recentChats || null,
    error: error?.response?.data?.message || null,
    refetchRecentChats: refetch
  };
};

export default useRecentChats;
