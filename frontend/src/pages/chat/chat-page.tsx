import {
  HStack,
} from '@chakra-ui/react';

import { Sidebar } from './side-bar';
import { ChatArea } from './chat-area';


const ChatPage = () => {
  return (
    <HStack bg="gray.100">
      <Sidebar />
      <ChatArea />
    </HStack>
  );
};

export default ChatPage;
