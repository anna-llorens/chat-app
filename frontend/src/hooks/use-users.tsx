import { api } from '@/api';
import { User } from '@/interfaces';
import { useState, useEffect } from 'react';

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/users');
        setUsers(response.data);
        setError(null);
      } catch (err: any) {
        setUsers(null);
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    isLoading,
    users,
    error,
  };
};

export default useUsers;
