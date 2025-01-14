
import useOnlineStatus from "@/hooks/chat/use-online-status";
import { UserCard } from "./user-card"
import useRecentChats from "@/hooks/chat/use-recent-chats";
import { useAuth } from "@/hooks/user/use-Auth";
import { Skeleton, VStack } from "@chakra-ui/react";
import { useChat } from "@/context/chat-context";
import { socket } from "@/socket";
import { useQueryClient } from "@tanstack/react-query";

export const RecentChats = () => {
  const authUser = useAuth();
  const { recentChats, isLoading, error } = useRecentChats(authUser?.id as string);
  const { selectedUser } = useChat();
  const { onlineUsers } = useOnlineStatus();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <VStack spaceY={1}>
      <Skeleton height="40px" w="100%" />
      <Skeleton height="40px" w="100%" />
      <Skeleton height="40px" w="100%" />
    </VStack>
  }
  if (error) {
    return <div>Error loading chats: {error}</div>;
  }

  return (
    <>
      {recentChats && recentChats.length > 0 ? (
        recentChats.map(({ user, lastUpdated, lastMessage, chatId, notificationCount }) => {
          const isOnline = onlineUsers.includes(String(user?.id));
          const isCurrentChat = selectedUser?.id === user?.id;
          if (isCurrentChat && notificationCount > 0) {
            socket?.emit("markAsRead", { userId: authUser?.id, chatId });
            queryClient.invalidateQueries({ queryKey: ["recentChats", authUser?.id] })
          }
          return (
            <UserCard
              user={user}
              isOnline={isOnline}
              key={chatId}
              lastUpdated={lastUpdated}
              lastMessage={lastMessage}
              notificationCount={!isCurrentChat ? notificationCount : 0}
              chatId={chatId}
            />
          );
        })
      ) : (
        <div>No recent chats</div>
      )}
    </>
  );
}