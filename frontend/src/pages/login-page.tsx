import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  return (
    <Center minH="100vh" bg="gray.100">
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="lg"
        maxW="sm"
        w="full"
        textAlign="center"
      >
        <Heading as="h1" size="lg" mb={4} color="blue.600">
          Welcome to Chat App Demo
        </Heading>
        <Text mb={6} fontSize="md" color="gray.600">
          {isRegistering ? "Create new account:" : "Please enter your email account"}
        </Text>
        <Stack spaceY={4}>
          {isRegistering && (
            <Input
              placeholder="Full Name"
              type="text"
              size="md"
              variant="outline"

            />
          )}
          <Input
            placeholder="Email"
            type="email"
            size="md"
            variant="outline"

          />
          <Button colorScheme="blue" size="md">
            LOGIN
          </Button>
          {!isRegistering && (
            <>
              <Text color="gray.500" fontSize="sm">
                or
              </Text>
              <Button
                colorScheme="blue"
                size="md"
                variant="outline"
                onClick={handleRegisterClick}
              >
                REGISTER NEW USER
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Center>
  );
}

export default LoginPage;
