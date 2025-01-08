import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { api } from "@/api";
import { User } from "@/interfaces";
import { LS_USER } from "@/constants";

interface LoginResponse {
  message: string;
  user?: User;
}

interface AuthContextType {
  user?: User;
  isLoading: boolean;
  login: (email: string) => Promise<{ data?: User; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const storedUser = localStorage.getItem(LS_USER);
  const [user, setUser] = useState<User | undefined>(storedUser ? JSON.parse(storedUser) : undefined);

  const login = async (email: string): Promise<{ data?: User; error?: string }> => {
    setIsLoading(true);
    try {
      const response = await api.post<LoginResponse>("/users/login", { email });
      const data = response.data;
      if (data.user?.id) {
        localStorage.setItem(LS_USER, JSON.stringify(data.user));
        setUser(data.user);
      }
      return { data: data.user };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred";
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem(LS_USER);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
