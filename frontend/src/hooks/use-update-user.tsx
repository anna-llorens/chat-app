import { api } from '@/api';
import { User } from '@/interfaces';
import { useState, useCallback } from 'react';

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useCallback(async (userId: string, updates: Partial<User>) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/users/${userId}`, { user: updates });
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
    updateUser,
  };
};


