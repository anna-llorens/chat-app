import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { AppError } from "@/interfaces";
import { useAuth } from "../user/use-Auth";

interface MarkAsReadInput {
  userId: string;
  chatId: string;
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const authUser = useAuth()
  return useMutation<void, AppError, MarkAsReadInput>({
    mutationFn: async ({ chatId }) => {
      await api.put("/notifications/mark-read", { userId: authUser?.id, chatId });
    },
    onSuccess: (_, { chatId }) => {
      // Optionally handle success, e.g., by invalidating or updating relevant cache
      console.log(`Notification for chat ${chatId} marked as read.`);
      queryClient.fetchQuery({ queryKey: ['recentChats', authUser?.id] });
    },
    onError: (error) => {
      console.error("Error marking notification as read:", error);
    },
  });
};

