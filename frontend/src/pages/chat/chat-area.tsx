import { Avatar } from "@/components/ui/avatar"
import { Box, HStack, Badge, VStack, Input, Button, Text } from "@chakra-ui/react"

import { FiSearch, FiStar } from "react-icons/fi"

export const ChatArea = () => {

  return <Box w="85%" bg="white" p={4} display="flex" flexDirection="column" shadow="lg">
    {/* Chat Header */}
    <HStack mb={4} justify="space-between">
      <HStack spaceX={3}>
        <Avatar name="Dianne Jhonson" size="sm" />
        <Text fontSize="lg" fontWeight="bold">
          Dianne Jhonson
        </Text>
        <Badge colorScheme="green">Online</Badge>
      </HStack>
      <HStack spaceX={2}>
        <FiSearch size="24px" />
        <FiStar size="24px" />
      </HStack>
    </HStack>

    {/* Chat Messages */}
    <Box flex="1" overflowY="auto" mb={4}>
      <VStack align="stretch" spaceY={4}>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Hi David, have you got the project report pdf?</Text>
        </Box>
        <Box alignSelf="flex-end" bg="blue.200" p={3} borderRadius="lg">
          <Text fontSize="sm">No, I did not get it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">
            Ok, I will just send it here. Plz be sure to fill the details by today
            end of the day.
          </Text>
        </Box>
        <Box alignSelf="flex-end" bg="blue.200" p={3} borderRadius="lg">
          <Text fontSize="sm">
            Ok. Should I send it over email as well after filling the details?
          </Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
        <Box alignSelf="flex-start" bg="blue.50" p={3} borderRadius="lg">
          <Text fontSize="sm">Ya. I'll be adding more team members to it.</Text>
        </Box>
      </VStack>
    </Box>

    {/* Message Input */}
    <HStack>
      <Input placeholder="Write something..." flex="1" borderRadius="md" />
      <Button colorScheme="blue">Send</Button>
    </HStack>
  </Box>
}