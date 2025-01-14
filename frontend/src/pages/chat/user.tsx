import { HStack, Box, Text, Circle, Float, Badge, VStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { User } from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useChat } from "@/context/chat-context";
import { formatMessageDate } from "@/helpers";
import { useMarkAsRead } from "@/hooks/chat/use-mark-as-read";

type UserComponentProps = {
  user: User;
  lastUpdated?: string;
  lastMessage?: string;
  isOnline: boolean;
  chatId?: string;
  unreadCount?: number
}

export const UserComponent: React.FC<UserComponentProps> = ({ user, lastUpdated, lastMessage, isOnline, unreadCount, chatId }) => {
  const queryClient = useQueryClient();
  const { setSelectedUser, selectedUser, setDetailsInfo } = useChat();
  const isSelected = selectedUser?.id === user?.id;
  const markAsRead = useMarkAsRead()

  const onUserSelect = useCallback(
    (user: User) => {
      setSelectedUser(user);
      setDetailsInfo(null);
      if (chatId) {
        markAsRead.mutate({ userId: user?.id as string, chatId });
      }
    },
    [queryClient, setDetailsInfo, setDetailsInfo]
  );



  return (
    <HStack
      key={user?.id}
      spaceX={1}
      p={1}
      onClick={() => onUserSelect(user)}
      borderRadius="8px"
      bg={lastMessage && isSelected ? "gray.200" : "transparent"}
      w="100%"
      cursor="pointer"
    >
      <Avatar name={user?.name} size="xs" bg="blue.200">
        <Float placement="bottom-end" offsetX="1" offsetY="1">
          <Circle
            bg={isOnline ? "green.500" : "gray.500"}
            size="10px"
            outline="0.2em solid"
            outlineColor={lastMessage && isSelected ? "gray.200" : "bg"}
          />
        </Float>
      </Avatar>
      <Box flex="1">
        <Text fontSize="sm" fontWeight="bold" truncate>
          {user?.name}
        </Text>
        {lastMessage ? (
          <Text fontSize="xs" color="gray.500" truncate>
            {lastMessage}
          </Text>
        ) : null}
      </Box>

      {/* Notification Counter */}
      {unreadCount ? (
        <Badge colorPalette="red" borderRadius="full" px={2} size="xs">
          {unreadCount}
        </Badge>
      ) : lastUpdated ? (
        <Text fontSize="xs" color="gray.400" truncate>
          {formatMessageDate(new Date(lastUpdated))}
        </Text>
      ) : null}

    </HStack >
  );
}  