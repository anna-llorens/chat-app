import { HStack, Input, VStack, Text, IconButton } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { useMemo, useState } from "react";
import useUsers from "@/hooks/user/use-users";
import { UserComponent } from "./user";

export const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users } = useUsers();
  const filteredUsers = useMemo(() => {
    return users?.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return <>
    <HStack position="sticky"
      top={0}
      bg="white"
      zIndex={1}
      p={2}
    >
      <Input
        placeholder="Search Here..."
        borderRadius="md"
        size="sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        flex="1" />
      {searchQuery && (
        <IconButton
          aria-label="Clear search"
          variant="outline"
          size="sm"
          onClick={() => setSearchQuery("")}
        >
          <IoClose />
        </IconButton>
      )}
    </HStack>
    <VStack align="stretch" p={2} className="anna">
      {filteredUsers?.length ? (
        filteredUsers.map((user) =>
          <UserComponent user={user} key={user.id} />)
      ) : (
        <Text fontSize="sm" color="gray.500" textAlign="center">
          No users found.
        </Text>
      )}
    </VStack></>
} 