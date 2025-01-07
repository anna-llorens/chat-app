import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setNewMessage('');
  };


  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      minH="100vh"
      p={4}
      bg="gray.100"
    >
      <Box w="full" maxW="lg" bg="white" p={6} rounded="md" shadow="lg">
        <Heading size="lg" color="blue.600" mb={4}>
          Chat Room
        </Heading>
        <Text fontSize="md" color="gray.600">
          Welcome to the chat room! Start the conversation below./</Text>

        <Box
          h="60vh"
          overflowY="auto"
          bg="gray.50"
          p={4}
          rounded="md"
          border="1px solid"
          borderColor="gray.200"
        >
          {messages.length > 0 ? (
            <Stack spaceY={3}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  p={3}
                  bg="blue.100"
                  rounded="md"
                  alignSelf="start"
                >
                  <Text fontSize="md">{msg}</Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <Text color="gray.500" fontSize="md" textAlign="center">
              No messages yet. Start the conversation!
            </Text>
          )}
        </Box>
      </Box>
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        w="full"
        maxW="lg"
        mt={4}
        bg="white"
        p={4}
        rounded="md"
        shadow="lg"
      >
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          flex="1"
          size="md"
          variant="outline"
        />
        <Button
          ml={2}
          colorScheme="blue"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
