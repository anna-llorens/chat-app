import { api } from '@/api';
import { User } from '@/interfaces';
import { useState, useCallback } from 'react';

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = useCallback(async (user: User) => {
    setIsLoading(true);
    try {
      const response = await api.post('/users', { user });
      return { user: response.data, error: null };
    } catch (err: any) {
      return {
        user: null,
        error: err.response?.data?.message || 'Something went wrong',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    createUser,
  };
};


export default useCreateUser;
