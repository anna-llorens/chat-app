import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { User } from "@/interfaces";
import { useAuth } from "./use-Auth";

const fetchUsers = async (authUserId?: string): Promise<User[]> => {
  const response = await api.get("/users");
  const users: User[] = response.data;
  return users.filter(user => user.id !== authUserId);
};

const useUsers = () => {
  const authUser = useAuth();
  const { data: users, isLoading, error } = useQuery<User[], any>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(authUser?.id),
  });

  return {
    isLoading,
    users: users || null,
    error: error?.response?.data?.message || null,
  };
};

export default useUsers;
