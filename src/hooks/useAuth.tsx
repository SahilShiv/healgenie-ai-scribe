
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the user type
type User = {
  id: string;
  name: string;
  email: string;
  userType: string; // Added userType property to the User type
  avatarImage?: string;
};

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// Create the auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API
    if (email && password) {
      // Mock successful login
      setUser({
        id: '1',
        name: 'Dr. Jane Smith',
        email: email,
        userType: 'doctor', // Default userType
        avatarImage: '', // Add a default avatar or leave empty
      });
      return true;
    }
    return false;
  };

  // Mock register function
  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // In a real app, this would call an API
    if (userData.email && userData.password) {
      // Mock successful registration
      setUser({
        id: '1',
        name: userData.name,
        email: userData.email,
        userType: userData.userType, // Use the provided userType
        avatarImage: userData.avatarImage,
      });
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
