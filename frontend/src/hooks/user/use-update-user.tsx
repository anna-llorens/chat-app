import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { AppError, User } from "@/interfaces";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    User,
    AppError,
    { userId: string; user: Partial<User> }
  >({
    mutationFn: async ({ userId, user }) => {
      const response = await api.put(`/users/${userId}`, { user });
      return response.data;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["authUser"], updatedUser);
      queryClient.setQueryData(["selectedUser"], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });
};
