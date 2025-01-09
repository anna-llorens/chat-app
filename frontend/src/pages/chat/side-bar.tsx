import { Box, HStack, Input, VStack, Text, IconButton } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import useUsers from "@/hooks/use-users";
import { useChat } from "@/context/chat-context";

export const Sidebar = () => {
  const { logout, user } = useAuth();
  const { users } = useUsers();
  const { showUserDetails } = useChat()
  return (
    <Box w="15%" bg="white" p={2} shadow="lg" position="relative" minW="260px">
      {/* User Info */}
      <HStack
        mb={4}
        spaceX={3}
        onClick={() => showUserDetails(user?.id)}
        cursor="pointer"
        p={2}
        bg="gray.300"
        borderRadius="md"
      >
        <Avatar name={user?.name} size="md" bg="blue.300" />
        <Box>
          <Text fontSize="md" fontWeight="bold">
            {user?.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {user?.email}
          </Text>
        </Box>
      </HStack>
      {/* Search */}
      <Input placeholder="Search Here..." mb={4} borderRadius="md" size="sm" />
      {/* Contacts */}
      <Box overflowY="auto" maxH="calc(100vh - 200px)">
        <VStack align="stretch" spaceY={3}>
          {users?.length && users.map(({ name, id }) => (
            <HStack key={id} spaceX={2} onClick={() => showUserDetails(id)}>
              <Avatar name={name} size="xs" />
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  {name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Last message here...
                </Text>
              </Box>
              <Text fontSize="xs" color="gray.400" ml="auto">
                10:35 AM
              </Text>
            </HStack>
          ))}
        </VStack>


      </Box>

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
