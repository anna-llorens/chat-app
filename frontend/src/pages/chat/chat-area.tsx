import { Avatar } from "@/components/ui/avatar"
import { useChat } from "@/context/chat-context";
import { useAuth } from "@/hooks/user/use-Auth";
import { Message, User } from "@/interfaces";
import { socket } from "@/socket";
import { Box, HStack, Badge, VStack, Input, Button, Text } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { FiSearch, FiStar } from "react-icons/fi"

export const ChatArea = () => {
  const { data: selectedUser } = useQuery<User>({ queryKey: ["selectedUser"] });
  const queryClient = useQueryClient();
  const { setDetailsVisible } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const authUser = useAuth() as User;
  const [messages, setMessages] = useState<Message[]>([]);
  const room = selectedUser ? [authUser.id, selectedUser.id].sort().join("_").concat("_room") : null;



  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (room) {
      socket?.emit("join", { room, senderId: authUser?.id });
      setMessages([]);

      // socket?.on("history", (history: Message[]) => {
      //   setMessages(history.map((msg: Message) => msg));
      // });

      socket?.on("newMessage", (message) => {
        if (room === message.room) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }

    return () => {
      socket?.off("history");
      socket?.off("message");
    };
  }, [room, authUser?.id]);



  const showUserDetails = () => {
    queryClient.setQueryData(["selectedUser"], selectedUser);
    setDetailsVisible(true);
  }

  const sendMessage = () => {
    if (input.trim()) {
      const time = new Date().toLocaleTimeString();
      const message = { content: input, senderId: authUser?.id, time, room };
      socket?.emit("message", message);
      setInput("");
    }
  };

  return <Box w="80%" bg="white" p={4} m={2} display="flex" flexDirection="column" shadow="lg" borderRadius="8px">
    <HStack mb={4} justify="space-between">
      <HStack spaceX={3} cursor="pointer" onClick={showUserDetails}>
        <Avatar name={selectedUser?.name} size="sm" bg="blue.200"></Avatar>
        <Text fontSize="lg" fontWeight="bold">
          {selectedUser?.name}
        </Text>
        <Badge colorScheme="green">Online</Badge>
      </HStack>
      <HStack spaceX={2}>
        <FiSearch size="24px" />
        <FiStar size="24px" />
      </HStack>
    </HStack>

    <Box flex="1" overflowY="auto" mb={4}>
      <VStack align="stretch" spaceY={4}>
        {messages.map((message) => (
          <Box
            key={message.time}
            alignSelf={message.senderId === authUser.id ? 'flex-end' : 'flex-start'}
            bg={message.senderId === authUser.id ? 'blue.200' : 'blue.50'}
            p={3}
            borderRadius="lg"
          >
            <Text fontSize="sm">{message.content}</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>
              {message.time}
            </Text>
          </Box>
        ))}
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