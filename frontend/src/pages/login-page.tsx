import { useState } from "react";
import {
  Box,
  Center,
  Input,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import useLogin from "../hooks/use-login"; // Import the custom hook
import { Toaster, toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { login, error, user, isLoading } = useLogin(); // Destructure useLogin

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginClick = async () => {
    if (!email) {
      toaster.create({
        title: "Error",
        description: "Email is required.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    const loggedInUser = await login(email);

    if (loggedInUser) {
      toaster.create({
        title: "Success",
        description: `Welcome back, ${loggedInUser.name}!`,
        type: "success",
        duration: 3000,
      });
    }
  };

  return (

    <Center minH="100vh" bg="gray.100">
      <Toaster />
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            placeholder="Email"
            type="email"
            size="md"
            variant="outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <Button
            colorScheme="blue"
            size="md"
            loading={isLoading}
            onClick={handleLoginClick}
          >
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

          {user && (
            <Text color="green.500" fontSize="sm">
              Logged in as: {user.name}
            </Text>
          )}
        </Stack>
      </Box>
    </Center>
  );
}

export default LoginPage;
