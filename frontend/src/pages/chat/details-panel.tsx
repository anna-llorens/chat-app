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

import { useDeleteUser } from "@/hooks/user/use-delete-user";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useUpdateUser } from "@/hooks/user/use-update-user";
import { LS_USER } from "@/constants";
import { AppError } from "@/interfaces";
import { useAuth } from "@/hooks/user/use-Auth";

const UserDetailsInfo: React.FC = ({
}) => {
  const { setDetailsInfo, detailsUser } = useChat();
  const authUser = useAuth();
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (detailsUser) {
      setEmail(detailsUser.email);
      setName(detailsUser.name);
    }
    setIsEditing(false);
  }, [detailsUser]);

  const resetFormValues = () => {
    if (detailsUser) {
      setIsEditing(false);
      setEmail(detailsUser.email);
      setName(detailsUser.name);
    }
  }

  const onClose = () => {
    setDetailsInfo(null);
    resetFormValues();
  };

  const onSave = async () => {
    if (detailsUser) {
      updateUser.mutate({ userId: detailsUser.id, user: { name, email } },
        {
          onSuccess: (user) => {
            toaster.create({
              description: "User updated successfully",
              type: 'success',
              duration: 3000,
            });
            setDetailsInfo(user);
            setIsEditing(false);
            localStorage.setItem(LS_USER, JSON.stringify(user));
          },
          onError: (error: AppError) => {
            toaster.create({
              title: 'Network error',
              description: error.response?.data?.message,
              type: 'error',
              duration: 3000,
            });
          },
        });
    }
  };

  const onUserDelete = async () => {
    if (detailsUser) {
      deleteUser.mutate(detailsUser.id), {
        onError: (error: AppError) => {
          toaster.create({
            title: 'Network error',
            description: error.response.data.message,
            type: 'error',
            duration: 3000,
          });
        }
      };
    }
  }

  return detailsUser ? (
    <Box
      w={{ base: "100%", md: "400px" }}
      bg="white"
      shadow="lg"
      borderRadius="md"
      position="relative"
      p={4} mx={{ base: 0, md: 2 }}

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
          <Avatar size="2xl" name={detailsUser.name} bg="purple.200" />
        )}

        {isEditing ? (
          <VStack spaceY={1} align="stretch">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </VStack>
        ) : (
          <VStack spaceY={1} align="center">
            <Text fontSize="xl" fontWeight="bold">
              {detailsUser.name}
            </Text>
            <Text fontSize="md" color="gray.600">
              {detailsUser.email}
            </Text>
          </VStack>
        )}

        <Text fontSize="sm" color="gray.500">
          Joined: {new Date(String(detailsUser.createdAt)).toLocaleDateString()}
        </Text>
        <HStack spaceX={1} mt={4}>
          {isEditing ? (
            <>
              <Button
                size="xs"
                variant="outline"
                onClick={resetFormValues}
              >
                Cancel
              </Button>
              <Button colorPalette="cyan" onClick={onSave} size="xs">
                Save
              </Button>
            </>
          ) : (detailsUser.id === authUser?.id &&
            <Button variant="outline" onClick={() => setIsEditing(true)} size="xs">
              Edit
            </Button>
          )}

        </HStack>

      </VStack>
      {detailsUser.id === authUser?.id ? < VStack align="stretch">
        <Button colorPalette="red" onClick={onUserDelete} mt={20} size="xs">
          Delete Account
        </Button>
      </VStack> : null}
      <Toaster />
    </Box >
  ) : null;
};

export default UserDetailsInfo;
