import { api } from '@/api';
import { useState, useCallback } from 'react';

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/users/${userId}`);
      return { success: true, error: null };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || 'Something went wrong',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    deleteUser,
  };
};

