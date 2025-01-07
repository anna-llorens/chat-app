import { api } from '@/api'; // Import the reusable Axios instance
import { useState } from 'react';
import { User } from '@/interfaces';

interface LoginResponse {
  message: string;
  user?: User;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string): Promise<{ data?: User; error?: string }> => {
    setIsLoading(true);

    try {
      const response = await api.post<LoginResponse>('/users/login', { email });

      const data = response.data;

      if (data.user?.id) {
        localStorage.setItem('chat-app::userId', data.user.id);
      }
      return { data: data.user }; // Return the user data
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'An unexpected error occurred';
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    login,
  };
};

export default useLogin;
