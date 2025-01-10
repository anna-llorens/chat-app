import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { User } from "@/interfaces";

const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

const useUsers = () => {
  const { data: users, isLoading, error } = useQuery<User[], any>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return {
    isLoading,
    users: users || null,
    error: error?.response?.data?.message || null,
  };
};

export default useUsers;
