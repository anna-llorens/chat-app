import { LS_USER } from "@/constants";
import { User } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const storedUser = localStorage.getItem(LS_USER);
  const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;
  const { data: user } = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => initialUser,
    initialData: initialUser,
  });
  return user;
};