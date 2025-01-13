
import useOnlineStatus from "@/hooks/chat/use-online-status";
import { UserComponent } from "./user"
import useRecentChats from "@/hooks/chat/use-recent-chats";
import { useAuth } from "@/hooks/user/use-Auth";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton, VStack } from "@chakra-ui/react";

export const RecentChats = () => {
  const authUser = useAuth();
  const { recentChats, isLoading, error } = useRecentChats(authUser?.id as string);
  const { onlineUsers } = useOnlineStatus();
  const queryClient = useQueryClient();

  if (recentChats) {
    queryClient.setQueryData(["selectedUser"], recentChats[0].user);
  }

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
        recentChats.map(({ user, lastMessage, createdAt, chatId }) => {
          const isOnline = onlineUsers.includes(String(user?.id));
          return (
            <UserComponent
              user={user}
              key={chatId}
              lastMessage={lastMessage}
              createdAt={createdAt}
              isOnline={isOnline}
            />
          );
        })
      ) : (
        <div>No recent chats</div>
      )}
    </>
  );
}