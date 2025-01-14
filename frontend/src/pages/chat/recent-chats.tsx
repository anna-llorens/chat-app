
import useOnlineStatus from "@/hooks/chat/use-online-status";
import { UserComponent } from "./user"
import useRecentChats from "@/hooks/chat/use-recent-chats";
import { useAuth } from "@/hooks/user/use-Auth";
import { Skeleton, VStack } from "@chakra-ui/react";

export const RecentChats = () => {
  const authUser = useAuth();
  const { recentChats, isLoading, error } = useRecentChats(authUser?.id as string);
  const { onlineUsers } = useOnlineStatus();

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
          return (
            <UserComponent
              user={user}
              key={chatId}
              lastUpdated={lastUpdated}
              lastMessage={lastMessage}
              isOnline={isOnline}
              unreadCount={notificationCount}
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