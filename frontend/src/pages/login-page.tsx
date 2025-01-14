import React, { useState } from 'react';
import {
  Box,
  Center,
  Input,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';

import { Toaster, toaster } from '@/components/ui/toaster';
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button';
import useCreateUser from '@/hooks/user/use-create-user';

import { AppError, LoginUser } from '@/interfaces';
import { useLogin } from '@/hooks/user/use-login';

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const login = useLogin();
  const createUser = useCreateUser();
  const [formData, setFormData] = useState<LoginUser>({ email: "", name: "" });
  const [formErrors, setFormErrors] = useState<LoginUser>({ email: "", name: "" });

  const validateData = () => {
    const errors = { email: "", name: "" };
    setFormErrors(errors);
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (isRegistering && !formData.name) {
      errors.name = "Name is required";
    }
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const toggleIsRegistering = () => {
    setIsRegistering(!isRegistering);
    setFormData({
      name: "",
      email: "",
    });
    setFormErrors({ email: "", name: "" });
  };

  const onUserRegister = async () => {
    if (!validateData()) {
      return;
    }
    createUser.mutate({ name: formData.name, email: formData.email }, {
      onError: (error: AppError) => {
        toaster.create({
          title: "Error",
          description: error?.response?.data.message || "An unexpected error occurred",
          type: 'error',
          duration: 3000,
        });
      },
      onSuccess: (user) => {
        toaster.create({
          title: 'Success',
          description: `User created, ${user?.name}`,
          type: 'success',
          duration: 3000,
        });
        setIsRegistering(false);
        setFormData((prev) => ({
          ...prev,
          name: "",
        }));
      }
    })
  };

  const handleLoginClick = async () => {
    if (!validateData()) {
      return;
    }
    login.mutate({ email: formData.email }, {
      onError: (error: AppError) => {
        toaster.create({
          title: 'Network error',
          description: error?.response?.data.message || "An unexpected error occurred",
          type: 'error',
          duration: 3000,
        });
      },
    });
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
            <Field invalid={!!formErrors.name} errorText={formErrors.name}>
              <Input
                placeholder="Full Name"
                type="text"
                size="md"
                variant="outline"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: e.target.value
                })
                )}
              />
            </Field>

          )}
          <Field invalid={!!formErrors.email} errorText={formErrors.email}>
            <Input
              placeholder="Email"
              type="email"
              size="md"
              variant="outline"
              onKeyUp={(e) => e.key === "Enter" && handleLoginClick()}
              value={formData.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                email: e.target.value
              })
              )}
            />
          </Field>

          {!isRegistering ? (
            <>
              <Button
                colorScheme="blue"
                size="md"
                loading={login.isPending}
                onClick={handleLoginClick}
              >
                LOGIN
              </Button>
              <Text color="gray.500" fontSize="sm">
                or
              </Text>
              <Button
                colorScheme="blue"
                size="md"
                variant="outline"
                onClick={toggleIsRegistering}
              >
                REGISTER NEW USER
              </Button>
            </>
          ) : <>
            <Button
              colorScheme="blue"
              size="md"
              // loading={isLoading}
              onClick={onUserRegister}
            >
              REGISTER
            </Button>
            <Button
              colorScheme="blue"
              size="md"
              variant="outline"
              onClick={toggleIsRegistering}
            >
              BACK TO LOGIN
            </Button>
          </>}
        </Stack>
      </Box>
    </Center >
  );
};

export default LoginPage;

