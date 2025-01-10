import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { AppError, LoginUser } from "@/interfaces";

const useCreateUser = () => {
  return useMutation<
    LoginUser,
    AppError,
    LoginUser
  >({
    mutationFn: async (user) => {
      const response = await api.post("/users", { user });
      return response.data;
    },
  });
};

export default useCreateUser;
