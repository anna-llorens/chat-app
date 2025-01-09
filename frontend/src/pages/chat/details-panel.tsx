import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,

  IconButton,
  Input,
  HStack,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { useChat } from "@/context/chat-context";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

interface UserDetailsProps {
  onDelete: () => void;
  onSave: (updatedDetails: { name: string; email: string; avatarUrl?: string }) => void;
}

const UserDetailsInfo: React.FC<UserDetailsProps> = ({
  onDelete,
  onSave,
}) => {
  const { isDetailsVisible, setDetailsPanel, selectedUser } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (selectedUser) {
      setEditedEmail(selectedUser.email);
      setEditedName(selectedUser.name);
    }
    setIsEditing(false);
  }, [selectedUser]);

  const onClose = () => {
    setDetailsPanel(false);
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave({ name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  return isDetailsVisible && selectedUser ? (
    <Box
      w="400px"
      bg="white"
      p={6}
      shadow="lg"
      borderRadius="md"
      position="relative"
    >
      <IconButton
        aria-label="Close"
        position="absolute"
        top="10px"
        right="10px"
        size="sm"
        onClick={onClose}
        bg="transparent"
        color="black"
        _hover={{ bg: "gray.200" }}

      >
        <RxCross2 />
      </IconButton>

      <VStack spaceY={2} align={isEditing ? "stretch" : "center"} mt={8}>
        {!isEditing && (
          <Avatar size="2xl" name={selectedUser.name} bg="blue.200" />
        )}

        {isEditing ? (
          <VStack spaceY={1} align="stretch">
            <Input
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </VStack>
        ) : (
          <VStack spaceY={1} align="center">
            <Text fontSize="xl" fontWeight="bold">
              {selectedUser.name}
            </Text>
            <Text fontSize="md" color="gray.600">
              {selectedUser.email}
            </Text>
          </VStack>
        )}

        <Text fontSize="sm" color="gray.500">
          Joined: {new Date(String(selectedUser.createdAt)).toLocaleDateString()}
        </Text>

        {/* Action Buttons */}
        <HStack spaceX={1} mt={4}>
          {isEditing ? (
            <>
              <Button
                size="xs"
                variant="outline"
                onClick={() => {
                  setEditedName(selectedUser.name);
                  setEditedEmail(selectedUser.email);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button colorPalette="cyan" onClick={handleSave} size="xs">
                Save
              </Button>
            </>
          ) : (selectedUser.id === user?.id &&
            <Button variant="outline" onClick={() => setIsEditing(true)} size="xs">
              Edit
            </Button>
          )}

        </HStack>

      </VStack>
      {selectedUser.id === user?.id ? < VStack align="stretch">
        <Button colorPalette="red" onClick={onDelete} mt={20}>
          Delete Account
        </Button>
      </VStack> : null}
    </Box >
  ) : null;
};

export default UserDetailsInfo;
