import { Avatar } from "@/components/ui/avatar"
import { useChat } from "@/context/chat-context";
import { useAuth } from "@/hooks/user/use-Auth";
import { Message, User } from "@/interfaces";
import { socket } from "@/socket";
import { Box, HStack, VStack, Input, Button, Text, Float, Circle } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { formatMessageDate, generateChatId } from "@/helpers"

import { FiSearch, FiStar } from "react-icons/fi"
import useOnlineStatus from "@/hooks/chat/use-online-status";
import React from "react";
import useRecentChats from "@/hooks/chat/use-recent-chats";

export const ChatArea = () => {
  const { selectedUser, setDetailsInfo } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const authUser = useAuth() as User;
  const [messages, setMessages] = useState<Message[]>([]);
  const { onlineUsers } = useOnlineStatus();
  const isOnline = onlineUsers.includes(String(selectedUser?.id));
  const chatId = generateChatId(selectedUser?.id, authUser.id);
  const { refetchRecentChats } = useRecentChats(authUser.id)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      socket?.emit("join", chatId);
      setMessages([]);
      socket?.on("history", (history: Message[]) => {
        setMessages(history.map((msg: Message) => msg));
      });
      socket?.on("newMessage", (message) => {
        if (chatId === message.chatId) {
          setMessages((prev) => [...prev, message]);
          refetchRecentChats(); // Updates user recentChats
        }
      });
    }
    return () => {
      socket?.off("history");
      socket?.off("message");
      socket?.off("newMessage")
    };
  }, [chatId, authUser?.id]);



  const showUserDetails = () => {
    setDetailsInfo(selectedUser);
  }

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        content: input,
        senderId: authUser?.id,
        chatId,
        contactId: selectedUser?.id,
      };
      socket?.emit("message", message);
      setInput("");
    }
  };

  return <Box w="80%" bg="white" p={4} mx={2} display="flex" flexDirection="column" shadow="lg" borderRadius="8px">
    <HStack mb={4} justify="space-between">
      <HStack spaceX={3} cursor="pointer" onClick={showUserDetails}>
        <Avatar name={selectedUser?.name} size="xs" bg="blue.200" >
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Circle
              bg={isOnline ? "green.500" : "gray.500"}
              size="10px"
              outline="0.2em solid"
              outlineColor="bg"
            />
          </Float>
        </Avatar>
        <Text fontSize="lg" fontWeight="bold">
          {selectedUser?.name}
        </Text>
      </HStack>
      <HStack spaceX={2}>
        <FiSearch size="24px" />
        <FiStar size="24px" />
      </HStack>
    </HStack>

    <Box flex="1" overflowY="auto" mb={4}>
      <VStack align="stretch" spaceY={4}>
        {messages.map((message, idx) => {
          const messageDate = new Date(message.createdAt);
          const previousMessageDate =
            idx > 0 ? new Date(messages[idx - 1].createdAt) : null;
          // Determine if we need to show a date separator
          const showDateSeparator =
            !previousMessageDate || messageDate.toDateString() !== previousMessageDate.toDateString();
          return (
            <React.Fragment key={idx}>
              {showDateSeparator && (
                <Box alignSelf="center" my={2}>
                  <Text fontSize="xs" color="gray.500">
                    {formatMessageDate(messageDate, true)}
                  </Text>
                </Box>
              )}
              <Box
                alignSelf={message.senderId === authUser.id ? 'flex-end' : 'flex-start'}
                bg={message.senderId === authUser.id ? 'blue.200' : 'blue.50'}
                p={3}
                borderRadius="lg"
              >
                <Text fontSize="sm">{message.content}</Text>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {messageDate.toLocaleTimeString()}
                </Text>
              </Box>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </VStack>
    </Box>

    <HStack>
      <Input placeholder="Write something..."
        flex="1" borderRadius="md"
        value={input} onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && sendMessage()} />
      <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
    </HStack>
  </Box >
}