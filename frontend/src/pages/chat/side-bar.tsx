import { useCallback } from "react";
import { Box, HStack, Text, IconButton, Float, Circle } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import { useChat } from "@/context/chat-context";
import { useQueryClient } from "@tanstack/react-query";
import { LS_USER } from "@/constants";
import { MdOutlineModeEdit } from "react-icons/md";
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
import { ChatGroups } from "./chat-groups";

export const Sidebar = () => {
  const { setDetailsInfo, setSelectedUser } = useChat();
  const queryClient = useQueryClient();
  const authUser = useAuth();

  const logout = useCallback(() => {
    localStorage.removeItem(LS_USER);
    queryClient.setQueryData(["authUser"], null);
    setSelectedUser(null);

    disconnectSocket();
  }, [queryClient]);

  const showUserDetails = useCallback(
    (user: User) => {
      setDetailsInfo(user);
    },
    [queryClient, setDetailsInfo]
  );

  return (
    <Box w={{ base: "100%", md: "20%" }} bg="white" shadow="lg" position="relative" minW="260px" borderRadius="md">
      <HStack
        mb={2}
        spaceX={4}
        bg="gray.300"
        align="center"
        p={4}
      >
        <Avatar name={authUser?.name} size="lg" bg="purple.300">
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Circle
              bg={"green.500"}
              size="12px"
              outline="0.2em solid"
              outlineColor={"gray.300"}
            />
          </Float>
        </Avatar>
        <Box flex="1">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {authUser?.name || "User Name"}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {authUser?.email || "user@example.com"}
          </Text>
        </Box>
        {/* Edit Icon Button */}
        <IconButton
          aria-label="Edit user details"
          size="md"
          onClick={() => showUserDetails(authUser as User)} // Trigger edit action
          variant="ghost"
          _hover={{ bg: "gray.300" }}
        >
          <MdOutlineModeEdit />
        </IconButton>
      </HStack>
      <AccordionRoot multiple defaultValue={["recent-chats", "groups", "contacts"]} p={1}>
        <AccordionItem value="recent-chats">
          <AccordionItemTrigger>
            <span>Recent Chats</span>
          </AccordionItemTrigger>
          <AccordionItemContent maxH="35vh" overflowY="auto" >
            <RecentChats />
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="groups">
          <AccordionItemTrigger>
            <span>Groups</span>
          </AccordionItemTrigger>
          <AccordionItemContent maxH="35vh" overflowY="auto" >
            <ChatGroups />
          </AccordionItemContent>
        </AccordionItem>

        <AccordionItem value="contacts">
          <AccordionItemTrigger overflowY="auto" >
            <span>Contacts</span>
          </AccordionItemTrigger>
          <AccordionItemContent overflowY="auto" h="30vh" p={0}>
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
    </Box >
  );
};
