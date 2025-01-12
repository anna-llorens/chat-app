import { Box } from '@chakra-ui/react';
import { Sidebar } from './side-bar';
import { ChatArea } from './chat-area';
import UserDetailsInfo from './details-panel';
import { ChatProvider } from '@/context/chat-context';
import { connectSocket } from '@/socket';
import { useAuth } from '@/hooks/user/use-Auth';
import { User } from '@/interfaces';

const ChatPage = () => {
  connectSocket((useAuth() as User).id);

  return (
    <ChatProvider>
      <Box bg="gray.100" display="flex" h="100vh" px={2} spaceX={3} p={1}>
        <Sidebar />
        <ChatArea />
        <UserDetailsInfo />
      </Box>
    </ChatProvider>
  );
};

export default ChatPage;
