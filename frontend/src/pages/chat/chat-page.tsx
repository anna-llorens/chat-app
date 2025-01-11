import { Box } from '@chakra-ui/react';
import { Sidebar } from './side-bar';
import { ChatArea } from './chat-area';
import UserDetailsInfo from './details-panel';
import { ChatProvider } from '@/context/chat-context';
import { connectSocket } from '@/socket';
import { useAuth } from '@/hooks/user/use-Auth';
import { User } from '@/interfaces';

const ChatPage = () => {
  const authUser = useAuth() as User;
  connectSocket(authUser.id);

  return (
    <ChatProvider>
      <Box bg="gray.100" display="flex" h="calc(100vh - 4px)" p={2} spaceX={3}>
        <Sidebar />
        <ChatArea />
        <UserDetailsInfo />
      </Box>
    </ChatProvider>
  );
};

export default ChatPage;
