import { Box, HStack, Input, VStack, Text, IconButton, Float, Circle } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import useUsers from "@/hooks/user/use-users";
import { useChat } from "@/context/chat-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LS_USER } from "@/constants";

import { User } from "@/interfaces";
import { useAuth } from "@/hooks/user/use-Auth";
import { disconnectSocket } from "@/socket";
import useOnlineStatus from "@/hooks/chat/use-online-status";

export const Sidebar = () => {
  const { users } = useUsers();
  const { setDetailsVisible } = useChat();
  const queryClient = useQueryClient();
  const authUser = useAuth();
  const { onlineUsers } = useOnlineStatus();
  const { data: selectedUser } = useQuery<User>({ queryKey: ["selectedUser"] });

  const logout = () => {
    localStorage.removeItem(LS_USER);
    queryClient.setQueryData(["authUser"], null);
    disconnectSocket();
  };

  const showUserDetails = (user: User) => {
    queryClient.setQueryData(["selectedUser"], user);
    setDetailsVisible(true);
  }

  const onUserSelect = (user: User) => {
    queryClient.setQueryData(["selectedUser"], user);
    setDetailsVisible(false);
  }


  return (
    <Box w="20%" bg="white" p={1} shadow="lg" position="relative" minW="260px" my={2} borderRadius="md">
      <HStack
        mb={4}
        spaceX={3}
        onClick={() => showUserDetails(authUser as User)}
        cursor="pointer"
        p={2}
        bg="gray.300"
        borderRadius="md"
      >
        <Avatar name={authUser?.name} size="md" bg="blue.300" />
        <Box>
          <Text fontSize="md" fontWeight="bold">
            {authUser?.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {authUser?.email}
          </Text>
        </Box>
      </HStack>
      <Input placeholder="Search Here..." mb={4} borderRadius="md" size="sm" />
      <VStack align="stretch" overflowY="auto" maxH="calc(100vh - 235px)" cursor="pointer" p={2}>
        {users?.length && users.map((user) => {
          const isSelected = selectedUser?.id === user.id;
          const isOnline = onlineUsers.includes(String(user.id));
          return (
            <HStack
              key={user.id}
              spaceX={2}
              p={1}
              onClick={() => onUserSelect(user)}
              borderRadius="8px"
              bg={isSelected ? "gray.200" : "transparent"}
              _hover={{
                cursor: "pointer",
                borderRadius: "8px"
              }}
              w="100%"
            >
              <Avatar name={user.name} size="xs" bg="blue.200" >
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
                <Text fontSize="xs" color="gray.500" truncate>
                  Last message here...
                </Text>
              </Box>
              <Text fontSize="xs" color="gray.400" ml="auto">
                10:35 AM
              </Text>
            </HStack>
          )
        })}
      </VStack>

      <IconButton
        colorPalette="red"
        size="sm"
        onClick={logout}
        position="absolute"
        bottom={1}
        w="95%"
      >
        <IoLogOutOutline />
        Logout
      </IconButton>
    </Box>
  );
};
