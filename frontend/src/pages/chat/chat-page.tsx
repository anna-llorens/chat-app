import { Box } from '@chakra-ui/react';
import { Sidebar } from './side-bar';
import { ChatArea } from './chat-area';
import UserDetailsInfo from './details-panel';
import { ChatProvider } from '@/context/chat-context';

const ChatPage = () => {
  return (
    <ChatProvider>
      <Box bg="gray.100" display="flex" h="calc(100vh - 4px)" p={2} spaceX={4}>
        <Sidebar />
        <ChatArea />
        <UserDetailsInfo
          onDelete={() => { }}
          onSave={(data) => console.log(data)}
        />
      </Box>
    </ChatProvider>
  );
};

export default ChatPage;
