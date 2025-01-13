import { HStack, Box, Text, Circle, Float } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

import { User } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useChat } from "@/context/chat-context";
import { formatMessageDate } from "@/helpers";

type UserComponentProps = {
  user: User;
  createdAt?: string;
  lastMessage?: string;
  isOnline: boolean;
}

export const UserComponent: React.FC<UserComponentProps> = ({ user, createdAt, lastMessage, isOnline }) => {
  const { data: selectedUser } = useQuery<User>({ queryKey: ["selectedUser"] });
  const queryClient = useQueryClient();
  const { setDetailsVisible } = useChat();
  const isSelected = selectedUser?.id === user?.id;


  const onUserSelect = useCallback(
    (user: User) => {
      queryClient.setQueryData(["selectedUser"], user);
      setDetailsVisible(false);
    },
    [queryClient, setDetailsVisible]
  );

  return <HStack
    key={user?.id}
    spaceX={1}
    p={1}
    onClick={() => onUserSelect(user)}
    borderRadius="8px"
    bg={lastMessage && isSelected ? "gray.200" : "transparent"}
    w="100%"
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
      {lastMessage ? <Text fontSize="xs" color="gray.500" truncate>
        {lastMessage}
      </Text> : null}
    </Box>
    {createdAt ? <Text fontSize="xs" color="gray.400" truncate>
      {formatMessageDate(new Date(createdAt))}
    </Text> : null}
  </HStack>
}