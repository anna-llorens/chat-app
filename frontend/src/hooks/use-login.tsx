import { useState } from 'react';

interface LoginResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);

  const login = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      setUser(data.user);
      return data.user;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    user,
    login,
  };
};

export default useLogin;
