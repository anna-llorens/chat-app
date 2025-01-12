import { HStack, Box, Text, Circle, Float } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

import { User } from "@/interfaces";
import useOnlineStatus from "@/hooks/chat/use-online-status";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useChat } from "@/context/chat-context";


export const UserComponent: React.FC<{ user: User, withDetails?: boolean }> = ({ user, withDetails = false }) => {
  const { data: selectedUser } = useQuery<User>({ queryKey: ["selectedUser"] });
  const { onlineUsers } = useOnlineStatus();
  const queryClient = useQueryClient();
  const { setDetailsVisible } = useChat();
  const isSelected = selectedUser?.id === user.id;
  const isOnline = onlineUsers.includes(String(user.id));

  const onUserSelect = useCallback(
    (user: User) => {
      queryClient.setQueryData(["selectedUser"], user);
      setDetailsVisible(false);
    },
    [queryClient, setDetailsVisible]
  );

  return <HStack
    key={user.id}
    spaceX={1}
    p={1}
    onClick={() => onUserSelect(user)}
    borderRadius="8px"
    bg={isSelected ? "gray.200" : "transparent"}
    _hover={{
      cursor: "pointer",
      borderRadius: "8px",
    }}
    w="100%"
  >
    <Avatar name={user.name} size="xs" bg="blue.200">
      <Float placement="bottom-end" offsetX="1" offsetY="1">
        <Circle
          bg={isOnline ? "green.500" : "gray.500"}
          size="10px"
          outline="0.2em solid"
          outlineColor={isSelected ? "gray.200" : "bg"}
        />
      </Float>
    </Avatar>
    <Box flex="1">
      <Text fontSize="sm" fontWeight="bold" truncate>
        {user.name}
      </Text>
      {withDetails ? <Text fontSize="xs" color="gray.500" truncate>
        Last message here...
      </Text> : null}
    </Box>
    {withDetails ? <Text fontSize="xs" color="gray.400" truncate>
      10:35 AM
    </Text> : null}
  </HStack>
}