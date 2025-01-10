import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { AppError } from "@/interfaces";
import { LS_USER } from "@/constants";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AppError,
    string
  >({
    mutationFn: async (userId) => {
      await api.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      localStorage.removeItem(LS_USER);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["authUser"], null);
      queryClient.setQueryData(["selectedUser"], null);
    }
  });
};
