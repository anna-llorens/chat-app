import { Box } from '@chakra-ui/react';
import { Sidebar } from './side-bar';
import { ChatArea } from './chat-area';
import UserDetailsInfo from './details-panel';
import { useChat } from '@/context/chat-context';
import { connectSocket } from '@/socket';
import { useAuth } from '@/hooks/user/use-Auth';
import { User } from '@/interfaces';
import { useMediaQuery } from '@chakra-ui/react';

const ChatPage = () => {
  connectSocket((useAuth() as User)?.id);
  const [isSmallScreen] = useMediaQuery(['(max-width: 768px)'], { ssr: false });
  const { selectedUser, detailsUser } = useChat();

  return (
    <Box bg="gray.100" display="flex" h="100vh" px={2} spaceX={3} p={isSmallScreen ? 0 : 3}>
      {((!detailsUser || !isSmallScreen) && (!selectedUser || !isSmallScreen)) && <Sidebar />}
      {(selectedUser && isSmallScreen && !detailsUser) ? <ChatArea /> : (!isSmallScreen && <ChatArea />)}
      {(isSmallScreen && detailsUser) ? <UserDetailsInfo /> : (!isSmallScreen && <UserDetailsInfo />)}
    </Box>
  );
};

export default ChatPage;
