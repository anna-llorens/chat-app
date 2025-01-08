import { Box, HStack, Input, VStack, Text, IconButton } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import { useUser } from "@/context/user-context";

export const Sidebar = () => {
  const { logout, user } = useUser();
  return (
    <Box w="15%" bg="white" p={2} shadow="lg" h="100vh" position="relative" minW="260px">
      {/* User Info */}
      <HStack mb={4} spaceX={3}>
        <Avatar name="David Peters" size="md" />
        <Box>
          <Text fontSize="md" fontWeight="bold">
            {user?.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {user?.email}
          </Text>
        </Box>
      </HStack>
      {/* Search */}
      <Input placeholder="Search Here..." mb={4} borderRadius="md" size="sm" />
      {/* Contacts */}
      <Box overflowY="auto" maxH="calc(100vh - 180px)">
        <VStack align="stretch" spaceY={4}>
          {[
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
            "Paul Wilson",
            "Ana Williams",
            "Lisa Roy",
            "Jamie Taylor",
            "Jason Roy",
            "Amy Frost",
          ].map((name, idx) => (
            <HStack key={idx} spaceX={3}>
              <Avatar name={name} size="sm" />
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  {name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Last message here...
                </Text>
              </Box>
              <Text fontSize="xs" color="gray.400" ml="auto">
                10:35 AM
              </Text>
            </HStack>
          ))}
        </VStack>


      </Box>

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


    </Box>
  );
};