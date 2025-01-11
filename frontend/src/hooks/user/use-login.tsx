import { api } from "@/api";
import { AppError } from "@/interfaces";
import { LS_USER } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AppError, { email: string }>({
    mutationFn: async ({ email }) => {
      const response = await api.post('/users/login', { email });
      return response.data;
    },
    onSuccess: ({ user }) => {
      if (user?.id) {
        localStorage.setItem(LS_USER, JSON.stringify(user));
        queryClient.setQueryData(['authUser'], user);

      }
    },
  });
};