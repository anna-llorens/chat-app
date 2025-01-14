import { useCallback } from "react";
import { Box, HStack, Text, IconButton } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import { useChat } from "@/context/chat-context";
import { useQueryClient } from "@tanstack/react-query";
import { LS_USER } from "@/constants";

import { User } from "@/interfaces";
import { useAuth } from "@/hooks/user/use-Auth";
import { disconnectSocket } from "@/socket";
import { ContactsList } from "./contacts-list";
import { RecentChats } from "./recent-chats";
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@/components/ui/accordion";

export const Sidebar = () => {
  const { setDetailsInfo } = useChat();
  const queryClient = useQueryClient();
  const authUser = useAuth();

  const logout = useCallback(() => {
    localStorage.removeItem(LS_USER);
    queryClient.setQueryData(["authUser"], null);
    disconnectSocket();
  }, [queryClient]);

  const showUserDetails = useCallback(
    (user: User) => {
      setDetailsInfo(user);
    },
    [queryClient, setDetailsInfo]
  );

  return (
    <Box w="20%" bg="white" p={1} shadow="lg" position="relative" minW="260px" borderRadius="md">
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
      <AccordionRoot multiple defaultValue={["recent-chats", "contacts"]}>
        <AccordionItem value="recent-chats">
          <AccordionItemTrigger>
            <span>Recent Chats</span>
          </AccordionItemTrigger>
          <AccordionItemContent maxH="40vh" overflowY="auto" >
            <RecentChats />
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem value="contacts">
          <AccordionItemTrigger overflowY="auto" >
            <span>Contacts</span>
          </AccordionItemTrigger>
          <AccordionItemContent overflowY="auto" h="38vh" p={0}>
            <ContactsList />
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
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
