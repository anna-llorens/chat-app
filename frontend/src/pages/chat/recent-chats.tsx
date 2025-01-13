
import useOnlineStatus from "@/hooks/chat/use-online-status";
import { UserComponent } from "./user"
import useRecentChats from "@/hooks/chat/use-recent-chats";
import { useAuth } from "@/hooks/user/use-Auth";

export const RecentChats = () => {
  const authUser = useAuth();
  const { recentChats, isLoading, error } = useRecentChats(authUser?.id as string);
  const { onlineUsers } = useOnlineStatus();

  return (recentChats?.map(({ user, lastMessage, createdAt, chatId }) => {
    const isOnline = onlineUsers.includes(String(user?.id));
    return (
      <UserComponent
        user={user}
        key={chatId}
        lastMessage={lastMessage}
        createdAt={createdAt}
        isOnline={isOnline}
      />
    )
  })
  );
}