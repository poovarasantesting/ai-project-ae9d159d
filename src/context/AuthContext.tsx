import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulating successful login with mock user data
    const mockUser = {
      id: "user-123",
      email,
      name: email.split("@")[0], // Use part of email as name for demo
    };
    
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulating successful registration with mock user data
    const mockUser = {
      id: "user-" + Math.random().toString(36).substring(2, 9),
      email,
      name,
    };
    
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};