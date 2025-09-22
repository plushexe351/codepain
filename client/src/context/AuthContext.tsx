import {
  useContext,
  createContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import {
  type User,
  loginApi,
  registerApi,
  logoutApi,
  getCurrentUserApi,
} from "../services/authService";

type AuthContextType = {
  user: User | null;
  userLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  // persistent user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getCurrentUserApi();
        setUser(user);
        console.log(user);
      } catch {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<User> => {
    const { user } = await registerApi(username, email, password);
    setUser(user);
    return user;
  };

  const login = async (username: string, password: string): Promise<User> => {
    const { user } = await loginApi(username, password);
    setUser(user);
    return user;
  };

  const logout = async (): Promise<void> => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, userLoading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
